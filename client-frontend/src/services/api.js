import axios from 'axios';

const API_URL = 'https://localhost:5001/api'; // Update this when backend is ready

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};