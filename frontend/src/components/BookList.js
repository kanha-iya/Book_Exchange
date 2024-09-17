import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from './BackendUrl';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get(url +'api/books', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.data.success) {
          setBooks(response.data.data); // Update state with the books owned by the user
        } else {
          setError('Failed to fetch books');
        }
      } catch (error) {
        setError('Failed to fetch books');
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h3>My Book List</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {books.length === 0 ? (
        <p>No books listed for exchange.</p>
      ) : (
        <ul className="list-group">
          {books.map((book) => (
            <li key={book._id} className="list-group-item">
              {book.title} by {book.author} - {book.genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
