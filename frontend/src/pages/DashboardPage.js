import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'my' | 'global'
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
  if (!user) {
    navigate('/dashboard');
  }
}, [user, navigate]);

if (!user) return null;

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">📘 Book Library Dashboard</h2>
          <small className="text-muted">
            Welcome, <strong>{user.name}</strong>!
          </small>
        </div>
      </div>

     {/* Filter Buttons */}
<div className="btn-group mb-4">
  {user?.role === 'admin' ? (
    <>
      <button
        className={`btn ${filter === 'public' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('public')}
      >
        Public Books
      </button>
      <button
        className={`btn ${filter === 'private' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('private')}
      >
        Private Books
      </button>
    </>
  ) : (
    <>
      <button
        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('all')}
      >
        All Books
      </button>
      <button
        className={`btn ${filter === 'my' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('my')}
      >
        My Books
      </button>
      <button
        className={`btn ${filter === 'global' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setFilter('global')}
      >
        Global Books
      </button>
    </>
  )}
</div>

      {/* Book Form */}
      <div className="card p-4 shadow-sm mb-5">
        <BookForm onBookAdded={handleRefresh} />
      </div>

      {/* Book List */}
      <div className="mb-5">
        <BookList key={refresh} userId={user._id} filter={filter} />
      </div>
    </div>
  );
};

export default DashboardPage;
