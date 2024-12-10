"use strict";

var express = require('express');

var router = express.Router();

var Book = require('../models/Book'); // Assuming you have a Book model
// Get the master list of books


router.get('/master-list-books', function _callee(req, res) {
  var books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Book.find({}));

        case 3:
          books = _context.sent;
          // Get all books from the database
          res.status(200).json({
            books: books
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Get all books

router.get('/', function _callee2(req, res) {
  var books;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Book.find());

        case 3:
          books = _context2.sent;
          // Fetches all books from the database
          res.json(books); // Sends the books data back as a JSON response

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: 'Failed to fetch books'
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;