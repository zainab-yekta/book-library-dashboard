import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const [publicBooks, setPublicBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token'); // Check login status

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API}/api/books/public`);
        setPublicBooks(res.data);
      } catch (error) {
        console.error('Error fetching public books:', error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = publicBooks
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 6); // Show only 6 featured books

  const handleViewAllBooks = () => {
    if (!isLoggedIn) {
      navigate('/register');
    } else {
      navigate('/dashboard'); 
    }
  };

  useEffect(() => {
  console.log("Loaded Books:", publicBooks);
}, [publicBooks]);

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1>📚 Welcome to the Book Library Dashboard</h1>
        <p className="lead">
          Discover, save, and organize your favorite books. Join now to create your personal library!
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/register')}>
          Join Now
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search featured books..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Features Section */}
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>📖 Track Your Library</h5>
              <p>Manage books you've read or plan to read.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>🌐 Explore Global Books</h5>
              <p>Get inspired by a curated list of popular books.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>🗂️ Organize Efficiently</h5>
              <p>Use search and custom views to stay organized.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <h3 className="mb-3">📚 Featured Public Books</h3>
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  //src={book.coverImage || "https://via.placeholder.com/150x220?text=No+Image"}
                 src={book.coverImage && book.coverImage.startsWith('http') ? book.coverImage : require('../images/bookcover.jpg')}
                  className="card-img-top"
                  alt="Book Cover"
                  //style={{ objectFit: 'cover', height: '220px' }}
                  style={{ objectFit: 'cover', height: '220px', width: '100%' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">by {book.author}</p>
                  <span className="badge bg-info">📘 Global Book</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-3">
        <button className="btn btn-outline-primary" onClick={handleViewAllBooks}>
          View All Public Books
        </button>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5 p-4 bg-light rounded shadow-sm">
        <h4>Want to save your own library?</h4>
        <p>Create an account to track your reading and manage your books.</p>
        <button className="btn btn-success" onClick={() => navigate('/register')}>
          Register Now
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 mb-3 text-muted">
        &copy; {new Date().getFullYear()} Book Library Dashboard | Made with ❤️
      </footer>
    </div>
  );
};

export default HomePage;
