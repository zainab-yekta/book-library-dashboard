import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ NOT BrowserRouter
import axios from 'axios';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import AboutUs from './pages/AboutUs';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import { useUser } from './context/UserContext';
import UnauthorizedPage from './pages/UnauthorizedPage';

const API = process.env.REACT_APP_BACKEND_URL;

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Auto-login failed:", err);
        localStorage.removeItem('token');
        setUser(null);
      });
    }
  },[setUser]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin" element={<PrivateAdminRoute><AdminDashboardPage /></PrivateAdminRoute>} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
