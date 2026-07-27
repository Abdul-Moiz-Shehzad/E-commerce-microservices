export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const BASE_ROUTES = {
  AUTH: '/api/auth',
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
} as const;
