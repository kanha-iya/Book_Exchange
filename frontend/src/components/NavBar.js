import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/register';
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">📚 Book Exchange</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end" id="offcanvasNavbar" tabIndex="-1">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">📚 Book Exchange</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Navigation items with active link styling */}
                {currentPath !== '/register' && currentPath !== '/' && (
                  <>
                    <li className="nav-item">
                      <Link className={`nav-link ${currentPath === '/home' ? 'active' : ''}`} to="/home">Home</Link>
                    </li>
                    <li className={`nav-item ${currentPath === '/mybooks' ? 'active' : ''}`}>
                      <Link className={`nav-link ${currentPath === '/mybooks' ? 'active' : ''}`} to="/mybooks">My Books</Link>
                    </li>
                    <li className={`nav-item ${currentPath === '/matches' ? 'active' : ''}`}>
                      <Link className={`nav-link ${currentPath === '/matches' ? 'active' : ''}`} to="/matches">Matches</Link>
                    </li>
                    <li className={`nav-item ${currentPath === '/addbook' ? 'active' : ''}`}>
                      <Link className={`nav-link ${currentPath === '/addbook' ? 'active' : ''}`} to="/addbook">Add Book</Link>
                    </li>
                    <li className={`nav-item ${currentPath === '/exchange-request' ? 'active' : ''}`}>
                      <Link className={`nav-link ${currentPath === '/exchange-request' ? 'active' : ''}`} to="/exchange-request">Request Exchange</Link>
                    </li>
                    <li className={`nav-item ${currentPath === '/manage-requests' ? 'active' : ''}`}>
                      <Link className={`nav-link ${currentPath === '/manage-requests' ? 'active' : ''}`} to="/manage-requests">Manage Requests</Link>
                    </li>
                  </>
                )}
              </ul>

              {/* Display login/register button or logout button based on the current path */}
              {currentPath === '/register' ? (
                <Link className="btn btn-outline-primary" to="/">Login</Link>
              ) : currentPath === '/' ? (
                <Link className="btn btn-outline-primary" to="/register">Register</Link>
              ) : (
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar-nav .nav-item .nav-link.active {
          color: #007bff; /* Highlight color for active links */
          font-weight: bold; /* Bold text for active link */
        }

        .navbar-nav .nav-item .nav-link {
          transition: color 0.3s ease; /* Smooth color transition */
        }

        .navbar-nav .nav-item .nav-link:hover {
          color: #0056b3; /* Color change on hover */
        }
      `}</style>
    </>
  );
}

export default NavBar;
