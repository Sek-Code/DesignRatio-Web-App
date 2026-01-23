import { create } from 'zustand';
import { createNewOrder, deleteOrderById, fetchAllOrders, updateOrderById } from '@/api/orderApi';

const extractErrorMessage = (err) =>
  err?.response?.data?.message || err?.message || 'Request failed';

export const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  lastFetched: null,

  loadOrders: async () => {
    const state = get();
    if (state.loading) return;

    const now = Date.now();
    if (state.lastFetched && now - state.lastFetched < 2000) return; // 2s cooldown

    set({ loading: true, error: null });

    try {
      const response = await fetchAllOrders();
      set({ orders: response.data || [], error: null, lastFetched: now });
    } catch (err) {
      set({ error: extractErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  },

  addOrder: async (orderData) => {
    try {
      await createNewOrder(orderData);
      const response = await fetchAllOrders();
      set({ orders: response.data || [], error: null, lastFetched: Date.now() });
    } catch (err) {
      set({ error: extractErrorMessage(err) });
      throw err;
    }
  },

  updatePaymentStatus: async (orderId, paymentStatus) => {
    // Use dot notation so we don't overwrite other status_order fields
    const updates = { 'status_order.payment_status': paymentStatus };

    try {
      const response = await updateOrderById(orderId, updates);
      const updated = response?.data;

      if (updated?._id) {
        set((state) => ({
          orders: state.orders.map((o) => (o._id === updated._id ? updated : o)),
        }));
      } else {
        // fallback: reload if API shape is unexpected
        await get().loadOrders();
      }
    } catch (err) {
      set({ error: extractErrorMessage(err) });
      throw err;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      await deleteOrderById(orderId);
      set((state) => ({
        orders: state.orders.filter((o) => o._id !== orderId),
      }));
    } catch (err) {
      set({ error: extractErrorMessage(err) });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
