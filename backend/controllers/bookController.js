const Book = require('../models/Book');
const User = require('../models/userModel');
const ExchangeRequest = require('../models/ExchangeRequest');
const mongoose = require('mongoose');
// Create a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const userId = req.user.id;

    const newBook = new Book({
      title,
      author,
      genre,
      user: userId,
    });

    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all books for the current user with optional filters
exports.getBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, author, genre } = req.query;
    const filters = { user: userId }; // Ensure only the user's books are fetched

    if (title) filters.title = { $regex: title, $options: 'i' };
    if (author) filters.author = { $regex: author, $options: 'i' };
    if (genre) filters.genre = { $regex: genre, $options: 'i' };

    const books = await Book.find(filters).populate('user', 'name');
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get matches based on user book preferences
exports.getMatches = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // Ensure userId is in ObjectId format

    // Find books owned by the current user
    const userBooks = await Book.find({ user: userId });

    if (!userBooks.length) {
      return res.status(200).json({ success: true, data: [] }); // No books for this user, no matches possible
    }

    // Extract titles of books owned by the user
    const userBookTitles = userBooks.map((b) => b.title);

    // Find users with matching books except the current user
    const matches = await User.aggregate([
      // Exclude the current user
      { $match: { _id: { $ne: userId } } },
      {
        // Lookup books for each user
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'user',
          as: 'books',
        },
      },
      {
        // Unwind the books array to process each book individually
        $unwind: '$books',
      },
      {
        // Match books where titles match the current user's books
        $match: { 'books.title': { $in: userBookTitles } },
      },
      {
        // Project the required fields
        $project: {
          _id: 1,
          bookRequested: '$books',
          'sender.username': '$username', // Include sender's username
        },
      },
    ]);

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all books available for exchange except the user's own books
exports.getAvailableBooksForExchange = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all books except the ones owned by the current user
    const books = await Book.find({ user: { $ne: userId } }).populate('user', 'username');
    
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// backend/controllers/exchangeController.js
// const ExchangeRequest = require('../models/ExchangeRequest');

// Create an exchange request
exports.requestExchange = async (req, res) => {
  try {
    const { requestedBookId } = req.body;
    const userId = req.user.id;

    // Find the requested book to get its owner's details
    const requestedBook = await Book.findById(requestedBookId);
    if (!requestedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Check if the requested book belongs to the current user
    if (requestedBook.user.toString() === userId) {
      return res.status(400).json({ success: false, message: 'Cannot request exchange for your own book' });
    }

    // Create a new exchange request
    const newRequest = new ExchangeRequest({
      book: requestedBookId,
      sender: userId,
      receiver: requestedBook.user,
    });

    await newRequest.save();
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// backend/controllers/exchangeController.js

// // Approve or Reject an Exchange Request
// exports.updateExchangeRequest = async (req, res) => {
//   try {
//     const { requestId, status } = req.body; // status can be 'approved' or 'rejected'
//     const userId = req.user.id;

//     // Find the exchange request by ID
//     const request = await ExchangeRequest.findById(requestId).populate('book');

//     if (!request) {
//       return res.status(404).json({ success: false, message: 'Request not found' });
//     }

//     // Check if the current user is the owner of the book
//     if (request.receiver.toString() !== userId) {
//       return res.status(403).json({ success: false, message: 'You are not authorized to update this request' });
//     }

//     if (status === 'approved') {
//       // Update the book owner to the request sender
//       request.book.user = request.sender; 
//       await request.book.save();
      
//     }

//     // Update the request status
//     request.status = status;
//     await request.save();

//     res.status(200).json({ success: true, data: request });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Approve or Reject an Exchange Request and delete it after the action
exports.updateExchangeRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body; // status can be 'approved' or 'rejected'
    const userId = req.user.id;

    // Find the exchange request by ID
    const request = await ExchangeRequest.findById(requestId).populate('book');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check if the current user is the owner of the book
    if (request.receiver.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this request' });
    }

    if (status === 'approved') {
      // Update the book owner to the request sender
      request.book.user = request.sender; 
      await request.book.save();
    }

    // Update the request status
    request.status = status;
    await request.save();

    // Delete the request after approval or rejection
    await ExchangeRequest.findByIdAndDelete(requestId);

    res.status(200).json({ success: true, message: `Request ${status} and deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRequestsForMyBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(1);
    // console.log(userId);
    // Find all books owned by the user
    const userBooks = await Book.find({ user: userId });
    // console.log(userBooks);
    if (!userBooks.length) {
      return res.status(200).json({ success: true, data: [] }); // No books owned by the user
    }

    // Find all exchange requests related to these books
    const requests = await ExchangeRequest.find({
      book: { $in: userBooks.map(b => b._id) }
    })
      .populate('book') // Populates the book details
      .populate('sender', 'username'); // Populates the sender's username

    // console.log(requests);
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};