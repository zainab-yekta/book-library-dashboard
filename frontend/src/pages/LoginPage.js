import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
//import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await api.post('/users/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setMessage('Login successful!');
      const userRes = await api.get('/users/profile'
        //{
       // headers: {
       //   Authorization: `Bearer ${token}`
       // }
     // }
      );
      setUser(userRes.data);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
