import { create } from 'zustand';
import { fetchAllProducts, fetchProductById, createNewProduct, updateProductData, deleteProductData } from '@/api/productApi';

// Transform backend product → consolidate by name
const transformProducts = (products) => {
  const grouped = {};

  // Group by name
  products.forEach(product => {
    if (!grouped[product.name]) {
      grouped[product.name] = {
        _id: product._id,
        name: product.name,
        image: product.image,
        type: product.type,
        is_active: product.is_active,
        variants: []
      };
    }
    
    // Add size variant
    grouped[product.name].variants.push({
      size: product.size,
      price: product.price,
      gram: product.gram || null
    });
  });

  return Object.values(grouped);
};

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  lastFetched: null,

  // ดึงสินค้าทั้งหมด
  loadProducts: async () => {
    const state = useProductStore.getState();
    
    if (state.loading) return;
    const now = Date.now();
    if (state.lastFetched && now - state.lastFetched < 2000) return;

    set({ loading: true, error: null });

    try {
      const response = await fetchAllProducts();
      const transformedProducts = transformProducts(response.data || []);
      set({ products: transformedProducts, error: null, lastFetched: now });
    } catch (err) {
      set({ error: err.message || "Failed to load products" });
    } finally {
      set({ loading: false });
    }
  },

  // ดึงสินค้า 1 รายการ
  getProductById: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await fetchProductById(id);
      const transformed = transformProducts([response.data])[0];
      return transformed;
    } catch (err) {
      set({ error: err.message || "Failed to fetch product" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // สร้างสินค้าใหม่
  addProduct: async (productData) => {
    try {
      await createNewProduct(productData);
      const response = await fetchAllProducts();
      const transformedProducts = transformProducts(response.data || []);
      set({ products: transformedProducts, error: null });
    } catch (err) {
      set({ error: err.message || 'Failed to create product' });
      console.error('Error creating product:', err);
      throw err;
    }
  },

  // แก้ไขสินค้า
  editProduct: async (id, productData) => {
    try {
      await updateProductData(id, productData);
      const response = await fetchAllProducts();
      const transformedProducts = transformProducts(response.data || []);
      set({ products: transformedProducts, error: null });
    } catch (err) {
      set({ error: err.message || 'Failed to update product' });
      console.error('Error updating product:', err);
      throw err;
    }
  },

  // ลบสินค้า
  removeProduct: async (id) => {
    try {
      await deleteProductData(id);
      const response = await fetchAllProducts();
      const transformedProducts = transformProducts(response.data || []);
      set({ products: transformedProducts, error: null });
    } catch (err) {
      set({ error: err.message || 'Failed to delete product' });
      console.error('Error deleting product:', err);
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
