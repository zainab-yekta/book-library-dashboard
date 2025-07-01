import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    if (decoded.role !== 'admin') {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    console.error('Invalid token', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
    //return <Navigate to="/unauthorized" />;
  }
};

export default PrivateAdminRoute;
