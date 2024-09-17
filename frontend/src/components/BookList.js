import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from './BackendUrl';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}api/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setBooks(response.data.data);
        } else {
          setError('Failed to fetch books');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching books');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">My Book List</h3>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : books.length === 0 ? (
        <p className="text-muted text-center">You have no books listed for exchange.</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-lg"
                style={{
                  borderRadius: '10px',
                  border: '1px solid #007bff',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Genre:</strong> {book.genre}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
