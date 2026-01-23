import { create } from "zustand";
import {
  fetchAllUsers,
  createNewUser,
  updateUserData,
  deleteUserData,
  login,
  authUser,
  logout,
} from "@/api/userApi";

const formatRateLimitWait = (err) => {
  const status = err?.response?.status;
  if (status !== 429) return null;

  const resetHeader = err?.response?.headers?.["ratelimit-reset"];
  const retryAfter = err?.response?.headers?.["retry-after"];

  const raw = retryAfter ?? resetHeader;
  const n = raw !== undefined ? Number(raw) : NaN;
  if (!Number.isFinite(n)) return "ลองใหม่อีกครั้งในอีกสักครู่";

  // Heuristic: if it's a unix timestamp, convert to seconds remaining
  const seconds =
    n > 1e9
      ? Math.max(1, Math.round(n - Date.now() / 1000))
      : Math.max(1, Math.round(n));

  return `ลองใหม่อีกครั้งใน ${seconds} วินาที`;
};

const getApiErrorMessage = (err, fallback) => {
  const fromResponse = err?.response?.data?.message;
  const fromResponseAlt = err?.response?.data?.error;
  const fromMessage = err?.message;

  if (err?.response?.status === 429) {
    const wait = formatRateLimitWait(err);
    return wait
      ? `พยายามเข้าสู่ระบบถี่เกินไป (${wait})`
      : "พยายามเข้าสู่ระบบถี่เกินไป กรุณารอสักครู่แล้วลองใหม่";
  }

  return fromResponse || fromResponseAlt || fromMessage || fallback;
};

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  currentUser: null,
  lastFetched: null,

  // Important for route guards on hard refresh.
  // Until this becomes true, guards should not redirect.
  authChecked: false,

  loadUsers: async () => {
    const state = get();
    if (state.loading) return;
    const now = Date.now();
    if (state.lastFetched && now - state.lastFetched < 2000) return;

    set({ loading: true, error: null });
    try {
      const response = await fetchAllUsers();
      set({ users: response.data || [], error: null, lastFetched: now });
    } catch (err) {
      set({ error: getApiErrorMessage(err, "Failed to load users") });
    } finally {
      set({ loading: false });
    }
  },

  addUser: async (userData) => {
    try {
      await createNewUser(userData);
      const response = await fetchAllUsers();
      set({ users: response.data || [], error: null });
    } catch (err) {
      const message = getApiErrorMessage(err, "Failed to create user");
      set({ error: message });
      console.error("Error creating user:", err);
      throw new Error(message);
    }
  },

  editUser: async (id, userData) => {
    try {
      const updated = await updateUserData(id, userData);
      const response = await fetchAllUsers();

      const nextState = { users: response.data || [], error: null };

      const me = get().currentUser;
      if (me && me._id === id && updated?.data) {
        nextState.currentUser = { ...me, ...updated.data };
      }

      set(nextState);
    } catch (err) {
      const message = getApiErrorMessage(err, "Failed to update user");
      set({ error: message });
      console.error("Error updating user:", err);
      throw new Error(message);
    }
  },

  removeUser: async (id) => {
    try {
      await deleteUserData(id);
      set((state) => ({
        users: state.users.filter((u) => u._id !== id),
        error: null,
      }));
    } catch (err) {
      const message = getApiErrorMessage(err, "Failed to delete user");
      set({ error: message });
      console.error("Error deleting user:", err);
      throw new Error(message);
    }
  },

  getUserById: (id) => {
    return (state) => state.users.find((u) => u._id === id);
  },

  loginUser: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await login(email, password);
      set({ currentUser: user, loading: false, authChecked: true });
      return user;
    } catch (err) {
      const message = getApiErrorMessage(err, "Failed to login");
      set({ error: message, loading: false, authChecked: true });
      console.error("Error logging in:", err);
      throw new Error(message);
    }
  },

  logoutUser: async () => {
    set({ loading: true, error: null });
    try {
      await logout();
      set({ currentUser: null, loading: false, authChecked: true });
    } catch (err) {
      const message = getApiErrorMessage(err, "Failed to logout");
      set({ error: message, loading: false, authChecked: true });
      console.error("Error logging out:", err);
      throw new Error(message);
    }
  },

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const user = await authUser();
      set({ currentUser: user, authChecked: true });
    } catch {
      set({ currentUser: null, authChecked: true });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
