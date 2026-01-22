import { create } from 'zustand';
import { fetchAllUsers, createNewUser, updateUserData, deleteUserData, login, authUser, logout } from '@/api/userApi';

export const useUserStore = create((set,get) => ({
  users: [],
  loading: false,
  error: null,
  currentUser: null,  
  lastFetched: null,

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
      set({ error: err.message || "Failed to load users" });
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
      set({ error: err.message || 'Failed to create user' });
      console.error('Error creating user:', err);
      throw err;
    }
  },

  editUser: async (id, userData) => {
    try {
      await updateUserData(id, userData);
      const response = await fetchAllUsers();
      set({ users: response.data || [], error: null });
    } catch (err) {
      set({ error: err.message || 'Failed to update user' });
      console.error('Error updating user:', err);
      throw err;
    }
  },

  removeUser: async (id) => {
    try {
      await deleteUserData(id);
      set((state) => ({
        users: state.users.filter(u => u._id !== id),
        error: null
      }));
    } catch (err) {
      set({ error: err.message || 'Failed to delete user' });
      console.error('Error deleting user:', err);
      throw err;
    }
  },

  getUserById: (id) => {
    return (state) => state.users.find(u => u._id === id);
  },

  loginUser: async(email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await login(email, password);
      set({ currentUser: user, loading: false });
      return user;
    } catch (err) {
      set({ 
        error: err.message || "Failed to login", 
        loading: false 
      });
      console.error('Error logging in:', err);
      throw err;
    }
  },

  logoutUser: async () => {
    set({ loading: true, error: null });
    try {
      await logout();
      set({ currentUser: null, loading: false });
    } catch (err) {
      set({ 
        error: err.message || "Failed to logout", 
        loading: false 
      });
      console.error('Error logging out:', err);
      throw err;
    }
  },

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const user = await authUser();
      set({ currentUser: user });
    } catch {
      set({ currentUser: null });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
