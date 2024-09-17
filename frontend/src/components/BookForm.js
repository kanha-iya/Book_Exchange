// src/components/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';
import url from './BackendUrl';

function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        url +'api/books',
        { title, author, genre },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookData = response.data.data; // Adjust based on your response structure

      setSuccessMessage('Book added successfully!'); // Success message
      setError(''); // Clear any previous errors

      if (onBookAdded) {
        onBookAdded(bookData);
      }

      setTitle('');
      setAuthor('');
      setGenre('');
    } catch (error) {
      console.error('Error adding book:', error);
      setSuccessMessage(''); // Clear any previous success messages
      setError(error.response?.data?.message || 'An error occurred. Please try again.'); // Error message
    }
  };

  return (
    <div>
      <h3>Add a Book</h3>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Genre</label>
          <input
            type="text"
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
