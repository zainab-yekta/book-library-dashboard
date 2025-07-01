import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pdf, setPdf] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      if (pdf) formData.append('pdf', pdf);

      await axios.post(
        'http://localhost:5000/api/books',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTitle('');
      setAuthor('');
      setPdf(null);
      onBookAdded();
    } catch (err) {
      console.error('Book add failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3>Add New Book</h3>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Book Title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Author"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="file"
          accept=".pdf"
          className="form-control"
          onChange={(e) => setPdf(e.target.files[0])}
        />
        <small className="form-text text-muted">Upload a PDF file</small>
      </div>

      <button className="btn btn-success">Add Book</button>
    </form>
  );
};

export default BookForm;
