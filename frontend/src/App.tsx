import { useState } from 'react';
import { AuthScreen, ProductsScreen, OrdersScreen } from './screens';

function App() {
  const [activeTab, setActiveTab] = useState<'auth' | 'products' | 'orders'>('auth');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Mini E-Commerce Microservices Frontend</h1>
      <p>Targeting API Gateway on: <code>http://localhost:5000</code></p>
      
      <div style={{ margin: '10px 0' }}>
        <button 
          onClick={() => setActiveTab('auth')}
          style={{ fontWeight: activeTab === 'auth' ? 'bold' : 'normal', marginRight: '10px' }}
        >
          Auth Service
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ fontWeight: activeTab === 'products' ? 'bold' : 'normal', marginRight: '10px' }}
        >
          Product Service
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ fontWeight: activeTab === 'orders' ? 'bold' : 'normal' }}
        >
          Order Service
        </button>
      </div>

      <hr />

      {activeTab === 'auth' && (
        <AuthScreen 
          token={token} 
          setToken={setToken} 
          userId={userId} 
          setUserId={setUserId} 
        />
      )}

      {activeTab === 'products' && (
        <ProductsScreen token={token} />
      )}

      {activeTab === 'orders' && (
        <OrdersScreen token={token} userId={userId} />
      )}
    </div>
  );
}

export default App;
