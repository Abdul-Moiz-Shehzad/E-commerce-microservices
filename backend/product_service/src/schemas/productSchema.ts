import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required'),
    price: z.number().positive('Price must be positive'),
    description: z.string().optional(),
    stock: z.number().int().nonnegative('Stock cannot be negative'),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>['body'];
