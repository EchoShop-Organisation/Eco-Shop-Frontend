import axios from "axios";

// Separate API URLs
const USER_API_BASE_URL = "http://127.0.0.1:8000/api/users";
const PRODUCT_API_BASE_URL = "http://127.0.0.1:8000/api/products";

// User API Functions
export const registerUser = async (userData) => {
  return axios.post(`${USER_API_BASE_URL}/register/`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${USER_API_BASE_URL}/login/`, credentials);
};

export const getUserProfile = async (token) => {
  return axios.get(`${USER_API_BASE_URL}/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Product API Function
export const getProducts = async () => {
  return axios.get(PRODUCT_API_BASE_URL);
};
