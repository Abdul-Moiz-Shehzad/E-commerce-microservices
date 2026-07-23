import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api/products';

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [singleProduct, setSingleProduct] = useState(null);
  const [responseLog, setResponseLog] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ name, price: Number(price), description, stock: Number(stock) }),
      });
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
      fetchProducts();
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  const handleGetSingleProduct = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    try {
      const res = await fetch(`${API_BASE}/${selectedId}`);
      const data = await res.json();
      setSingleProduct(data);
      setResponseLog(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
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
}

export default Products;
