import { ordersDb, OrderModel } from '../models/orderModel';
import { CreateOrderInput } from '../schemas/orderSchema';

export class OrderService {
  public async create(input: CreateOrderInput): Promise<OrderModel> {
    const newOrder: OrderModel = {
      id: `ord_${Date.now()}`,
      userId: input.userId,
      productId: input.productId,
      quantity: input.quantity,
      status: 'Placed',
      createdAt: new Date(),
    };

    ordersDb.push(newOrder);
    return newOrder;
  }

  public async getByUserId(userId: string): Promise<OrderModel[]> {
    return ordersDb.filter((o) => o.userId === userId);
  }
}

export const orderService = new OrderService();
