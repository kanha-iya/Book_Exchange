// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookMatch from './components/BookMatch';
import ExchangeRequests from './components/ExchangeRequests';
import ManageRequests from './components/ManageRequests';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mybooks" element={<BookList />} />
            <Route path="/addbook" element={<BookForm />} />
            <Route path="/matches" element={<BookMatch />} />
            <Route path="/exchange-request" element={<ExchangeRequests />} /> 
            <Route path="/manage-requests" element={<ManageRequests />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
