import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AdminStats from '../components/AdminStats';
import AdminBookManager from '../components/AdminBookManager';

const AdminDashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-3">
        👑 Admin Dashboard
      </h2>
      <p className="text-muted mb-4">
        Welcome back, <strong>{user?.name}</strong> <span className="badge bg-danger ms-2">ADMIN</span>
      </p>

      <AdminStats />
      <hr className="my-4" />
      <AdminBookManager />
    </div>
  );
};

export default AdminDashboardPage;
