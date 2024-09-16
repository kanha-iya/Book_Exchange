import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookMatch() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Ensure the user ID is correctly stored

        const response = await axios.get('https://book-exchange-backend.vercel.app/api/books/matches', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter out matches where the current user is the sender
        const filteredMatches = response.data.data.filter(
          (match) => match.sender._id !== userId
        );

        setMatches(filteredMatches);
      } catch (error) {
        setError('Failed to fetch matches');
      }
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h3>Book Matches</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul className="list-group">
          {matches.map((match, index) => (
            <li key={`${match._id}-${index}`} className="list-group-item">
              {match.bookRequested.title} by {match.bookRequested.author} - Requested by {match.sender.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookMatch;
