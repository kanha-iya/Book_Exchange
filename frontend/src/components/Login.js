// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
// import background from '../components/image/background'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-flame-one-87.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/mybooks';
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  
  return (
    <div className="container" >
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
