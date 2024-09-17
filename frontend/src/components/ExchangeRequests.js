import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from './BackendUrl';

function ExchangeRequest() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}api/books/available-books`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBooks(response.data.data);
      } catch (err) {
        setError('Failed to fetch available books');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvailableBooks();
  }, []);

  const handleExchangeRequest = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${url}api/books/request-exchange`,
        { requestedBookId: bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Exchange request sent successfully!');
      setError(''); // Clear any previous error
    } catch (err) {
      setError('Failed to send exchange request');
      setSuccess(''); // Clear any previous success message
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Available Books for Exchange</h3>

      {/* Error and Success Messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : books.length === 0 ? (
        <p className="text-muted text-center">No available books for exchange.</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-md-6 mb-4">
              <div
                className="card h-100 shadow-lg"
                style={{
                  borderRadius: '10px',
                  border: '1px solid #007bff',
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Genre:</strong> {book.genre} <br />
                    <strong>Owned by:</strong> {book.user.username}
                  </p>
                  <button
                    className="btn btn-primary btn-sm float-end"
                    onClick={() => handleExchangeRequest(book._id)}
                  >
                    Request Exchange
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExchangeRequest;
