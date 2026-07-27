import { AUTH_ENDPOINTS } from '../constants/endpoints';
import type { AuthResponse, RegisterPayload, LoginPayload } from '../interfaces/auth';
import type { ApiResponse } from '../interfaces/response';

export const authService = {
  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> => {
    const res = await fetch(AUTH_ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    const res = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  validate: async (token: string): Promise<ApiResponse<unknown>> => {
    const res = await fetch(AUTH_ENDPOINTS.VALIDATE, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  },
};
