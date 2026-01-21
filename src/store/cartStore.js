import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity, size) => 
        set((state) => {
          const existingItem = state.items.find(
            item => item.product._id === product._id && item.size === size
          );
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product._id === product._id && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            return {
              items: [...state.items, {
                id: Date.now() + Math.random(),
                product,
                quantity,
                size,
              }]
            };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        })),
      updateQty: (id, quantity) =>
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-store',
    }
  )
)
