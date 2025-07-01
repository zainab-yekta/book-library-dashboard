import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css';
import EditBookModal from './EditBookModal';

const BookList = ({ userId, filter }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // initially true
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true); // show spinner
        let res;

        if (filter === 'my') {
          res = await axios.get(`http://localhost:5000/api/books/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          // for all, public, private, global
          res = await axios.get('http://localhost:5000/api/books', {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
      finally {
        setLoading(false); // hide spinner after fetch
      }
    };

    fetchBooks();
  }, [filter, userId, token]);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // refresh book list
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };
  

  const filteredBooks = books.filter((book) => {
    if (filter === 'my') return book.user === userId || book.user?._id === userId;
    if (filter === 'global') return book.isPublic && book.user?._id !== userId;
    if (filter === 'public') return book.isPublic;
    if (filter === 'private') return !book.isPublic;
    return true; // 'all' or default
  });

  const searchedBooks = filteredBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-5">
      <h3>📚 Book Inventory</h3>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading books...</span>
          </div>
        </div>
      ) : searchedBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          <div className="alert alert-info small" role="alert">
            🔒 <strong>Note:</strong> Global books cannot be edited or deleted.
          </div>
          <div className="row">
            {searchedBooks.map((book) => {
              const isGlobal = book.isPublic;

              return (
                <div className="col-md-4 mb-4" key={book._id}>
                  <div className={`card h-100 shadow-sm ${isGlobal ? 'border-info' : ''}`}>
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                      {book.pdf && (
                        <div className="mt-2">
                          <a
                            href={`http://localhost:5000/${book.pdf}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            📄 View PDF
                          </a>
                        </div>
                      )}
                      {isGlobal && (
                        <span className="badge bg-info text-dark">Global Book</span>
                      )}
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (isGlobal) {
                            alert('This is a global book. You cannot delete it.');
                          } else {
                            deleteBook(book._id);
                          }
                        }}
                        disabled={isGlobal}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          if (isGlobal) {
                            alert('This is a global book. You cannot edit it.');
                          } else {
                            handleEditClick(book);
                          }
                        }}
                        disabled={isGlobal}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <EditBookModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        book={selectedBook}
        onBookUpdated={() => {
          // refresh list after editing
          setSelectedBook(null);
          setShowModal(false);
          // re-fetch books
          axios
            .get('http://localhost:5000/api/books', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBooks(res.data))
            .catch((err) => console.error('Error refreshing books:', err));
        }}
      />
    </div>
  );
};

export default BookList;
