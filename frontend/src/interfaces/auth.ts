import type { User } from './user';

export interface AuthResponse {
  token?: string;
  userId?: string;
  user?: User;
  message?: string;
  error?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
