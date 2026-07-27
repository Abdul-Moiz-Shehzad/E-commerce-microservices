import React, { useState } from 'react';
import { orderService } from '../services/orderService';
import type { Order } from '../interfaces/order';

interface OrdersScreenProps {
  token: string;
  userId: string;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ token, userId }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customUserId, setCustomUserId] = useState(userId || '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [responseLog, setResponseLog] = useState('');

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeUserId = customUserId || userId;
    if (!activeUserId) {
      alert('Please provide a User ID or log in first!');
      return;
    }
    const result = await orderService.create(
      {
        userId: activeUserId,
        productId,
        quantity: Number(quantity),
      },
      token
    );
    setResponseLog(JSON.stringify(result, null, 2));
  };

  const handleFetchUserOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetUserId = customUserId || userId;
    if (!targetUserId) {
      alert('Please specify a User ID to fetch orders for');
      return;
    }
    const result = await orderService.getByUserId(targetUserId, token);
    setResponseLog(JSON.stringify(result, null, 2));
    if (result.success && Array.isArray(result.data)) {
      setOrders(result.data);
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
            onChange={(e) => setQuantity(Number(e.target.value))} 
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
};
