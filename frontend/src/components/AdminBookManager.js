import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminBookManager = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await api.get('/admin/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to load books:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const togglePublic = async (bookId, currentStatus) => {
    try {
      const updated = await api.put(`/books/${bookId}`, {
        isPublic: !currentStatus,
      });
      setBooks((prev) =>
        prev.map((b) => (b._id === bookId ? updated.data : b))
      );
      setMessage(`Book marked as ${!currentStatus ? 'public' : 'private'}.`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Toggle failed:', err);
      setMessage('Failed to update visibility.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Separate global books (admin-added or no user) and user-submitted books
  const globalBooks = books.filter((b) => !b.user || b.user.role === 'admin');
  const userBooks = books.filter((b) => b.user && b.user.role === 'user');

  // Count total books per user for userBooks table
  const userBookCounts = {};
  userBooks.forEach((book) => {
    const email = book.user.email;
    userBookCounts[email] = (userBookCounts[email] || 0) + 1;
  });

  return (
    <div className="mt-4">
      {/* ✅ GLOBAL BOOKS TABLE */}
      <h4>📘 Manage Global Books</h4>
      {message && <div className="alert alert-info mt-2">{message}</div>}
      {globalBooks.length === 0 ? (
        <p>No global books found.</p>
      ) : (
        <table className="table table-bordered mt-3 shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>User</th>
              <th>Public</th>
            </tr>
          </thead>
          <tbody>
            {globalBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  {book.user ? `${book.user.name} (${book.user.role})` : 'None'}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={book.isPublic || false}
                    onChange={() => togglePublic(book._id, book.isPublic)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr className="my-5" />

      {/* ✅ USER-SUBMITTED BOOKS TABLE */}
      <h4>👤 User Submitted Books (Read Only)</h4>
      {userBooks.length === 0 ? (
        <p>No user-submitted books found.</p>
      ) : (
        <table className="table table-striped mt-3 shadow-sm">
          <thead className="table-dark text-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>User Name</th>
              <th>Submitted Date</th>
              <th>User’s Total Books</th>
            </tr>
          </thead>
          <tbody>
            {userBooks.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.user?.name}</td>
                <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                <td>{userBookCounts[book.user?._id]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookManager;
