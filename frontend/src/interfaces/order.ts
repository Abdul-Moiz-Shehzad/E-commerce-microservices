export interface Order {
  id?: string;
  _id?: string;
  userId: string;
  productId: string;
  quantity: number;
  status?: string;
}

export interface CreateOrderPayload {
  userId: string;
  productId: string;
  quantity: number;
}
