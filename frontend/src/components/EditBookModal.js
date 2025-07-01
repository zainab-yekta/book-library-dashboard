import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditBookModal = ({ show, handleClose, book, onBookUpdated }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
    }
  }, [book]);

  const handleSave = async () => {
    try {
      console.log("Editing book:", book._id);
      await axios.put(
        `http://localhost:5000/api/books/${book._id}`,
        { title, author },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onBookUpdated(); // refresh list
      handleClose();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;
