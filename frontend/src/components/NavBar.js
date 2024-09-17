// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import url from './BackendUrl';

function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/register';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Book Exchange</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Display navigation items based on the current path */}
            {currentPath !== '/register' && currentPath !== '/' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/mybooks">My Books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/matches">Matches</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addbook">Add Book</Link>
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/exchange-request">Request Exchange</Link> 
                </li>
                <li className='nav-item'>
                  <Link className="nav-link" to="/manage-requests">Manage Requests</Link> {/* New link */}
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
    </nav>
  );
}

export default NavBar;
