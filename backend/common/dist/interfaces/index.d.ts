export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    statusCode?: number;
}
export interface UserPayload {
    id: string;
    email: string;
    username?: string;
}
