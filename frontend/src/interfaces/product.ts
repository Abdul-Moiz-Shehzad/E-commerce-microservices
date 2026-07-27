export interface Product {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  description?: string;
  stock: number;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  description?: string;
  stock: number;
}
