import { AUTH_ENDPOINTS } from '../constants/endpoints';
import type { User } from '../interfaces/user';
import type { ApiResponse } from '../interfaces/response';

export const userService = {
  getUsers: async (token?: string): Promise<ApiResponse<User[]>> => {
    const res = await fetch(AUTH_ENDPOINTS.USERS, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return res.json();
  },

  getUserById: async (id: string, token?: string): Promise<ApiResponse<User>> => {
    const res = await fetch(`${AUTH_ENDPOINTS.USERS}/${id}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return res.json();
  },
};
