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
        <span className="navbar-brand" to="/">📚 Book Exchange</span>
          {/* <Link className="navbar-brand" to="/">Book Exchange</Link> */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Navigation items with active link styling */}
              {currentPath !== '/register' && currentPath !== '/' && (
                <>
                   <li className="nav-item">
                  <Link
                    className={`nav-link ${currentPath === '/home' ? 'active' : ''}`}
                    to="/home"
                  >
                    Home
                  </Link>
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
              <Link className="btn btn-outline-primary" to="/login">Register</Link>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            )}
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

// src/components/NavBar.js
// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// // import logo from '../assets/logo.png'; // Update the path if needed

// function NavBar() {
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">📚 Book Exchange</Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             {currentPath !== '/register' && currentPath !== '/' && (
//               <>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${currentPath === '/home' ? 'active' : ''}`}
//                     to="/home"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${currentPath === '/mybooks' ? 'active' : ''}`}
//                     to="/mybooks"
//                   >
//                     My Books
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${currentPath === '/matches' ? 'active' : ''}`}
//                     to="/matches"
//                   >
//                     Matches
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${currentPath === '/addbook' ? 'active' : ''}`}
//                     to="/addbook"
//                   >
//                     Add Book
//                   </Link>
//                 </li>
//                 <li className='nav-item'>
//                   <Link
//                     className={`nav-link ${currentPath === '/exchange-request' ? 'active' : ''}`}
//                     to="/exchange-request"
//                   >
//                     Request Exchange
//                   </Link>
//                 </li>
//                 <li className='nav-item'>
//                   <Link
//                     className={`nav-link ${currentPath === '/manage-requests' ? 'active' : ''}`}
//                     to="/manage-requests"
//                   >
//                     Manage Requests
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//           {currentPath === '/register' ? (
//             <Link className="btn btn-outline-primary" to="/">Login</Link>
//           ) : currentPath === '/' ? (
//             <Link className="btn btn-outline-primary" to="/register">Register</Link>
//           ) : (
//             <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .nav-link.active {
//           color: #007bff; /* Blue color for active link */
//           font-weight: bold;
//         }
//       `}</style>
//     </nav>
//   );
// }

// export default NavBar;
