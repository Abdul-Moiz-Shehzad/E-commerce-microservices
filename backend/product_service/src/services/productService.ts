import { productsDb, ProductModel } from '../models/productModel';
import { CreateProductInput } from '../schemas/productSchema';

export class ProductService {
  public async getAll(): Promise<ProductModel[]> {
    return productsDb;
  }

  public async getById(id: string): Promise<ProductModel> {
    const product = productsDb.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  public async create(input: CreateProductInput): Promise<ProductModel> {
    const newProduct: ProductModel = {
      id: `prod_${Date.now()}`,
      name: input.name,
      price: input.price,
      description: input.description,
      stock: input.stock,
      createdAt: new Date(),
    };

    productsDb.push(newProduct);
    return newProduct;
  }
}

export const productService = new ProductService();
