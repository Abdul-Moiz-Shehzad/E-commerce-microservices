import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api/auth';

function Auth({ token, setToken, userId, setUserId }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseLog, setResponseLog] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));

      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      }
      if (data.userId || (data.user && data.user.id)) {
        const uId = data.userId || data.user.id;
        setUserId(uId);
        localStorage.setItem('userId', uId);
      }
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  const handleValidate = async () => {
    try {
      const res = await fetch(`${API_BASE}/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponseLog(`Error: ${err.message}`);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setResponseLog('Logged out.');
  };

  return (
    <div>
      <h2>1. Auth Service</h2>
      
      <div>
        <strong>Current Auth State:</strong>
        <p>Token: {token || 'None'}</p>
        <p>User ID: {userId || 'None'}</p>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>

      <hr />

      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register (POST /api/auth/register)</button>
      </form>

      <hr />

      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login (POST /api/auth/login)</button>
      </form>

      <hr />

      <h3>Validate Token</h3>
      <button onClick={handleValidate}>Validate (GET /api/auth/validate)</button>

      <hr />

      <h4>Auth Response Log:</h4>
      <pre>{responseLog}</pre>
    </div>
  );
}

export default Auth;
