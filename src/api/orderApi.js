import axios from 'axios';
import { VITE_API_BASE_URL } from './config.js';

const API_Order = `${VITE_API_BASE_URL}/api/v2/orders`

export const fetchAllOrders = async ()=>    {
    try {
    const response = await axios.get(`${API_Order}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export const createNewOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_Order}/`, orderData);
            return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
    throw error;
    }
}