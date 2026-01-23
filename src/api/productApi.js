import axios from 'axios';
import { VITE_API_BASE_URL } from './config.js';

const API_URL = `${VITE_API_BASE_URL}/api/v2/products`;

// ดึงสินค้าทั้งหมด
export const fetchAllProducts = async (params = {}) => {
  try {
    const response = await axios.get(API_URL + "/", { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// ดึงสินค้าตาม ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// สร้างสินค้าใหม่
export const createNewProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// แก้ไขสินค้า
export const updateProductData = async (id, productData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// ลบสินค้า
export const deleteProductData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// อัปโหลดรูปสินค้า (Cloudinary)
export const uploadProductImage = async (file) => {
  const url = `${VITE_API_BASE_URL}/api/upload/product`;

  const form = new FormData();
  form.append('file', file);

  try {
    const res = await axios.post(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // { url, public_id }
    return res.data;
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
};
