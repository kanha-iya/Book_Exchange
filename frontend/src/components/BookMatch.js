import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from './BackendUrl';

function BookMatch() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Ensure the user ID is correctly stored

        const response = await axios.get(`${url}api/books/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter out matches where the current user is the sender
        const filteredMatches = response.data.data.filter(
          (match) => match.sender._id !== userId
        );

        setMatches(filteredMatches);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch matches');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Book Matches</h3>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : matches.length === 0 ? (
        <p className="text-muted text-center">No matches found.</p>
      ) : (
        <div className="row">
          {matches.map((match, index) => (
            <div key={`${match._id}-${index}`} className="col-md-6 mb-4">
              <div
                className="card h-100 shadow-lg"
                style={{
                  borderRadius: '10px',
                  border: '1px solid #28a745',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-success">
                    {match.bookRequested.title}
                  </h5>
                  <p className="card-text">
                    <strong>Author:</strong> {match.bookRequested.author} <br />
                    <strong>Requested By:</strong> {match.sender.username}
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

export default BookMatch;
