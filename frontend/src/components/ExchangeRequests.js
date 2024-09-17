// src/components/ExchangeRequest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from './BackendUrl';

function ExchangeRequest() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(url +'api/books/available-books', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBooks(response.data.data);
      } catch (error) {
        setError('Failed to fetch available books');
      }
    };
    fetchAvailableBooks();
  }, []);

  const handleExchangeRequest = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        url +'api/books/request-exchange',
        { requestedBookId: bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess('Exchange request sent successfully!');
    } catch (error) {
      setError('Failed to send exchange request');
    }
  };

  return (
    <div>
      <h3>Available Books for Exchange</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {books.length === 0 ? (
        <p>No available books for exchange.</p>
      ) : (
        <ul className="list-group">
          {books.map((book) => (
            <li key={book._id} className="list-group-item">
              {book.title} by {book.author} - {book.genre} (Owned by: {book.user.username})
              <button
                className="btn btn-primary btn-sm float-end"
                onClick={() => handleExchangeRequest(book._id)}
              >
                Request Exchange
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExchangeRequest;
