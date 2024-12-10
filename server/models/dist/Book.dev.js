"use strict";

var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "enum": ['Available', 'Issued'],
    "default": 'Available'
  },
  cost: {
    type: Number,
    required: true
  },
  procurementDate: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('Book', bookSchema);