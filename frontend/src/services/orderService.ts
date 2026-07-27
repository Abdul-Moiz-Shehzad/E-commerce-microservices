import { ORDER_ENDPOINTS } from '../constants/endpoints';
import type { Order, CreateOrderPayload } from '../interfaces/order';
import type { ApiResponse } from '../interfaces/response';

export const orderService = {
  create: async (payload: CreateOrderPayload, token?: string): Promise<ApiResponse<Order>> => {
    const res = await fetch(ORDER_ENDPOINTS.BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  getByUserId: async (userId: string, token?: string): Promise<ApiResponse<Order[]>> => {
    const res = await fetch(ORDER_ENDPOINTS.BY_USER_ID(userId), {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return res.json();
  },
};
