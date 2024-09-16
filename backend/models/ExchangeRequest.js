const mongoose = require('mongoose');

const exchangeRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  // bookRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('ExchangeRequest', exchangeRequestSchema);
