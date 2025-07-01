import React, { useState } from 'react';
import api from '../utils/api';
//import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

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
      const response = await api.post('/users/register', formData);
      setMessage('User registered successfully! You can now log in.');
      setFormData({ name: '', email: '', password: '' });
      console.log('User registered:', response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
