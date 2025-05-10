import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/inventory';

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(response.statusText || 'Something went wrong');
};

const handleError = (error) => {
  console.error('API Error:', error);
  throw error.response?.data?.message || error.message || 'Network Error';
};

export default {
  getInventoryItems: async () => {
    try {
      const response = await axios.get(API_URL);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getInventoryItem: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  createInventoryItem: async (itemData) => {
    try {
      const response = await axios.post(API_URL, itemData);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateInventoryItem: async (id, itemData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, itemData);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  deleteInventoryItem: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
};