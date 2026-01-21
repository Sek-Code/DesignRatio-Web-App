import axios from 'axios';
import { VITE_API_BASE_URL } from './config.js';

const API_URL = `${VITE_API_BASE_URL}/api/v2/users`;

// ดึงผู้ใช้ทั้งหมด
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// ดึงผู้ใช้ตาม ID
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// สร้างผู้ใช้ใหม่
export const createNewUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// แก้ไขผู้ใช้
export const updateUserData = async (id, userData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// ลบผู้ใช้
export const deleteUserData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export const login = async (email, password) => {

  const url = `${VITE_API_BASE_URL}/api/v2/users/auth/cookie/login`
   console.log("LOGIN URL:", url);
  try {const response = await axios.post(url,{email,password},{withCredentials: true},)
 
return response.data.user;
} catch (error) {
      console.error('Error login:', error);
    
      throw error;
    }

  
};