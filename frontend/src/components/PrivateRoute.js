import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');   //This checks for a token in localStorage.If found → show the page.If not → redirect to /login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    console.error('Invalid token', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
