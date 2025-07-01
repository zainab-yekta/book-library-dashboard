import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="row text-center mb-4">
    <div className="col-md-3">
      <div className="card bg-light p-3 shadow-sm">
        <h6>Total Books</h6>
        <h2>{stats.totalBooks}</h2>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card bg-light p-3 shadow-sm">
        <h6>Public Books</h6>
        <h2>{stats.publicBooks}</h2>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card bg-light p-3 shadow-sm">
        <h6>User Books</h6>
        <h2>{stats.userBooks}</h2>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card bg-light p-3 shadow-sm">
        <h6>Total Users</h6>
        <h2>{stats.totalUsers}</h2>
      </div>
    </div>
  </div>
  );
};

export default AdminStats;
