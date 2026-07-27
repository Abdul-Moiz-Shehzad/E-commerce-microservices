import { PRODUCT_ENDPOINTS } from '../constants/endpoints';
import type { Product, CreateProductPayload } from '../interfaces/product';
import type { ApiResponse } from '../interfaces/response';

export const productService = {
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    const res = await fetch(PRODUCT_ENDPOINTS.BASE);
    return res.json();
  },

  create: async (payload: CreateProductPayload, token?: string): Promise<ApiResponse<Product>> => {
    const res = await fetch(PRODUCT_ENDPOINTS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  getById: async (id: string): Promise<ApiResponse<Product>> => {
    const res = await fetch(PRODUCT_ENDPOINTS.BY_ID(id));
    return res.json();
  },
};
