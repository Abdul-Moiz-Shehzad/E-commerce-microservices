export interface OrderModel {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  status: 'Placed' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: Date;
}

export const ordersDb: OrderModel[] = [];
