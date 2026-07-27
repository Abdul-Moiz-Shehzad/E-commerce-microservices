import React, { useState } from 'react';
import { productService } from '../services/productService';
import type { Product } from '../interfaces/product';

interface ProductsScreenProps {
  token: string;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ token }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [responseLog, setResponseLog] = useState('');

  const fetchProducts = async () => {
    const result = await productService.getAll();
    setResponseLog(JSON.stringify(result, null, 2));
    if (result.success && Array.isArray(result.data)) {
      setProducts(result.data);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await productService.create(
      { name, price: Number(price), description, stock: Number(stock) },
      token
    );
    setResponseLog(JSON.stringify(result, null, 2));
    if (result.success) {
      fetchProducts();
    }
  };

  const handleGetSingleProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    const result = await productService.getById(selectedId);
    setResponseLog(JSON.stringify(result, null, 2));
    if (result.success) {
      setSingleProduct(result.data);
    }
  };

  return (
    <div>
      <h2>2. Product Service</h2>

      <button onClick={fetchProducts}>Fetch All Products (GET /api/products)</button>

      <hr />

      <h3>Add Product</h3>
      <form onSubmit={handleCreateProduct}>
        <div>
          <label>Product Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Stock Quantity: </label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <button type="submit">Create Product (POST /api/products)</button>
      </form>

      <hr />

      <h3>Get Product Details by ID</h3>
      <form onSubmit={handleGetSingleProduct}>
        <div>
          <label>Product ID: </label>
          <input type="text" value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required />
        </div>
        <button type="submit">Fetch Single Product (GET /api/products/:id)</button>
      </form>
      {singleProduct && (
        <div>
          <h4>Product Found:</h4>
          <pre>{JSON.stringify(singleProduct, null, 2)}</pre>
        </div>
      )}

      <hr />

      <h3>Product Catalog List</h3>
      {products.length === 0 ? (
        <p>No products loaded yet.</p>
      ) : (
        <ul>
          {products.map((prod) => (
            <li key={prod._id || prod.id}>
              ID: {prod._id || prod.id} | {prod.name} - ${prod.price} (Stock: {prod.stock})
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h4>Product Response Log:</h4>
      <pre>{responseLog}</pre>
    </div>
  );
};
