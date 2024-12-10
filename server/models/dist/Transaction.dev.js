"use strict";

var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  fineAmount: {
    type: Number,
    "default": 0
  },
  finePaid: {
    type: Boolean,
    "default": false
  },
  // New field to track if fine is paid
  status: {
    type: String,
    "enum": ['Issued', 'Returned', 'Canceled'],
    "default": 'Issued'
  }
});
module.exports = mongoose.model('Transaction', transactionSchema);