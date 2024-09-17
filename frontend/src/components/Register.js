// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import url from './BackendUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.post(`${url}api/auth/register`, { username, email, password });
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center">Create an Account</h2>

      {/* Error Alert */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Success Alert */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            aria-describedby="usernameHelp"
          />
          <div className="invalid-feedback">Username is required</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <div className="invalid-feedback">Please provide a valid email.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <div className="invalid-feedback">Password is required.</div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-block" 
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <div> Already have an account ?  <Link className="btn btn-outline-primary" to="/">Login</Link></div>
      </form>
    </div>
  );
}

export default Register;
