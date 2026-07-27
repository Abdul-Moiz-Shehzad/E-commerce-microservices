export interface ProductModel {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock: number;
  createdAt: Date;
}

export const productsDb: ProductModel[] = [];
