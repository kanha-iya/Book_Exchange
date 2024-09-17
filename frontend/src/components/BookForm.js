import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from './BackendUrl';

function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(''); // Clear any previous errors
    setSuccessMessage(''); // Clear previous success message

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${url}api/books`,
        { title, author, genre },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookData = response.data.data; // Adjust based on your response structure

      setSuccessMessage('Book added successfully!');
      setError('');
      if (onBookAdded) {
        onBookAdded(bookData);
      }

      // Clear input fields after successful submission
      setTitle('');
      setAuthor('');
      setGenre('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Add a Book</h3>

      {/* Success/Error Messages */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            id="author"
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <input
            id="genre"
            type="text"
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Adding...</span>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0069d9')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Add Book
          </button>
        )}
      </form>
    </div>
  );
}

export default BookForm;
