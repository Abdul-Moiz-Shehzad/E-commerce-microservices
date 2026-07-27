import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().int().positive('Quantity must be greater than 0'),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
