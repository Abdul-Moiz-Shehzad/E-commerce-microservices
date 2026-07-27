export interface ResponseSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
  statusCode?: number;
}

export interface ResponseError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
  details?: unknown;
}

export type ApiResponse<T = unknown> = ResponseSuccess<T> | ResponseError;
