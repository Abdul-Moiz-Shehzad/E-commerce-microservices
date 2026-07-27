import { Request, Response, NextFunction } from 'express';
import { orderService } from '../../services/orderService';

export class OrderController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newOrder = await orderService.create(req.body);
      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  public async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await orderService.getByUserId(req.params.userId);
      res.status(200).json(orders);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export const orderController = new OrderController();
