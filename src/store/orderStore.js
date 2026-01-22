import { createNewOrder, fetchAllOrders } from '@/api/orderApi';
import { create } from 'zustand';

export const useOrderStore = create((set,get) => ({
    orders: [],
    currentOrder: null,
    loading: false,         // ⏳ Flag แสดงว่ากำลัง fetch ข้อมูลอยู่
     error: null,  
  
  
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
      set({ error: err.message || "Failed to load orders" });
    } finally {
      set({ loading: false });
    }
},
    addOrder: async (orderData) => {
    try {
      await createNewOrder(orderData);  // ��� ส่งข้อมูลไป API
      const response = await fetchAllOrders();  // ��� ดึงรายการใหม่ทั้งหมด
      set({ orders: response.data || [], error: null });  // ✅ อัปเดต store
    } catch (err) {
      set({ error: err.message || 'Failed to create order' });  // ❌ เก็บ error
      console.error('Error creating order:', err);
      throw err;  // ส่งต่อ error ให้ component ที่เรียก
    }
  },
   clearError: () => set({ error: null }),  // ลบ error
}
));