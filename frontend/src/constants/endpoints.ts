export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  VALIDATE: `${API_BASE_URL}/auth/validate`,
  USERS: `${API_BASE_URL}/auth/users`,
} as const;

export const PRODUCT_ENDPOINTS = {
  BASE: `${API_BASE_URL}/products`,
  BY_ID: (id: string) => `${API_BASE_URL}/products/${id}`,
} as const;

export const ORDER_ENDPOINTS = {
  BASE: `${API_BASE_URL}/orders`,
  BY_USER_ID: (userId: string) => `${API_BASE_URL}/orders/${userId}`,
} as const;
