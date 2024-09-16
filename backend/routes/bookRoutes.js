// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { addBook, getBooks, getMatches, updateExchangeRequest , getRequestsForMyBooks ,getAvailableBooksForExchange , requestExchange } = require('../controllers/bookController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Add a book
router.post('/', authMiddleware, addBook);

// Get all books (with optional filters)
router.get('/', authMiddleware, getBooks);

// Get matches
router.get('/matches', authMiddleware, getMatches);

router.get('/available-books', authMiddleware, getAvailableBooksForExchange);

router.post('/request-exchange', authMiddleware, requestExchange);

router.post('/manage-requests', authMiddleware, updateExchangeRequest);

router.get('/get-requests', authMiddleware, getRequestsForMyBooks);

module.exports = router;
