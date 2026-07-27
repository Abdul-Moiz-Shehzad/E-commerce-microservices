import { Request, Response, NextFunction } from 'express';
import { productService } from '../../services/productService';

export class ProductController {
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await productService.getAll();
      res.status(200).json(products);
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.getById(req.params.id);
      res.status(200).json(product);
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message });
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProduct = await productService.create(req.body);
      res.status(201).json(newProduct);
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}

export const productController = new ProductController();
