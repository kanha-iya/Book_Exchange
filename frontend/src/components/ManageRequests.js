import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from './BackendUrl';

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}api/books/get-requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRequests(response.data.data);
      } catch (err) {
        setError('Failed to fetch exchange requests');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleRequestAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${url}api/books/manage-requests`,
        { requestId, status: action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(`Request ${action} successfully!`);
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId)
      );
    } catch (err) {
      setError(`Failed to ${action} the request`);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Manage Exchange Requests</h3>

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
      ) : requests.length === 0 ? (
        <p className="text-muted text-center">No exchange requests for your books.</p>
      ) : (
        <div className="list-group">
          {requests.map((request) => (
            <div key={request._id} className="list-group-item list-group-item-action mb-3 border rounded shadow-sm">
              {request.book ? (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">{request.book.title} by {request.book.author}</h5>
                      <p className="mb-1 text-muted">Requested by: {request.sender.username}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleRequestAction(request._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRequestAction(request._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p>Book information is missing or unavailable.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageRequests;
