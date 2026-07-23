import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api/orders';

function Orders({ token, userId }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customUserId, setCustomUserId] = useState(userId || '');
  const [orders, setOrders] = useState([]);
  const [responseLog, setResponseLog] = useState('');

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const activeUserId = customUserId || userId;
    if (!activeUserId) {
      alert('Please provide a User ID or log in first!');
      return;
    }
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          userId: activeUserId,
          productId,
          quantity: Number(quantity),
        }),
      });
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  const handleFetchUserOrders = async (e) => {
    e.preventDefault();
    const targetUserId = customUserId || userId;
    if (!targetUserId) {
      alert('Please specify a User ID to fetch orders for');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${targetUserId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>3. Order Service</h2>

      <div>
        <label>Target User ID for Orders: </label>
        <input 
          type="text" 
          value={customUserId} 
          onChange={(e) => setCustomUserId(e.target.value)} 
          placeholder={userId || "Enter User ID"} 
        />
      </div>

      <hr />

      <h3>Create Order / Checkout</h3>
      <form onSubmit={handleCreateOrder}>
        <div>
          <label>Product ID: </label>
          <input 
            type="text" 
            value={productId} 
            onChange={(e) => setProductId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Quantity: </label>
          <input 
            type="number" 
            min="1" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Place Order (POST /api/orders)</button>
      </form>

      <hr />

      <h3>Get User Orders</h3>
      <button onClick={handleFetchUserOrders}>
        Fetch Orders for User (GET /api/orders/:userId)
      </button>

      {orders.length > 0 && (
        <div>
          <h4>Orders List:</h4>
          <ul>
            {orders.map((ord) => (
              <li key={ord._id || ord.id}>
                Order ID: {ord._id || ord.id} | Product ID: {ord.productId} | Qty: {ord.quantity} | Status: {ord.status || 'Placed'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      <h4>Order Response Log:</h4>
      <pre>{responseLog}</pre>
    </div>
  );
}

export default Orders;
