// src/components/ManageRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://book-exchange-backend.vercel.app/api/books/get-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRequests(response.data.data);
      } catch (error) {
        setError('Failed to fetch exchange requests');
      }
    };
    fetchRequests();
  }, []);

  const handleRequestAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://book-exchange-backend.vercel.app/api/books/manage-requests',
        { requestId, status: action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(`Request ${action} successfully!`);

      // Remove or update the request from the list
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    } catch (error) {
      setError(`Failed to ${action} the request`);
    }
  };

  return (
    <div>
      <h3>Manage Exchange Requests</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {requests.length === 0 ? (
        <p>No exchange requests for your books.</p>
      ) : (
        <ul className="list-group">
          {requests.map((request) => (
            <li key={request._id} className="list-group-item">
              {request.book ? (
                <>
                  <p>
                    {request.book.title} by {request.book.author} - Requested by {request.sender.username}
                  </p>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleRequestAction(request._id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleRequestAction(request._id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <p>Book information is missing or unavailable.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageRequests;
