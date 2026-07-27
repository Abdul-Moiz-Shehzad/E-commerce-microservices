import React, { useState } from 'react';
import { authService } from '../services/authService';

interface AuthScreenProps {
  token: string;
  setToken: (token: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ token, setToken, userId, setUserId }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseLog, setResponseLog] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await authService.register({ username, email, password });
    setResponseLog(JSON.stringify(result, null, 2));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await authService.login({ email, password });
    setResponseLog(JSON.stringify(result, null, 2));

    if (result.success && result.data) {
      const authData = result.data;
      if (authData.token) {
        setToken(authData.token);
        localStorage.setItem('token', authData.token);
      }
      if (authData.userId) {
        setUserId(authData.userId);
        localStorage.setItem('userId', authData.userId);
      } else if (authData.user && authData.user.id) {
        setUserId(authData.user.id);
        localStorage.setItem('userId', authData.user.id);
      }
    }
  };

  const handleValidate = async () => {
    const result = await authService.validate(token);
    setResponseLog(JSON.stringify(result, null, 2));
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
};
