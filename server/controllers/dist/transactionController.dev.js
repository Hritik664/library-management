"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Transaction = require('../models/Transaction');

var Book = require('../models/Book'); // Get active issues


exports.getActiveIssues = function _callee(req, res) {
  var activeIssues;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Transaction.find({
            status: 'Issued'
          }).populate('bookId', 'name category') // Populate book details
          .populate('memberId', 'name contactNumber'));

        case 3:
          activeIssues = _context.sent;
          // Populate member details
          res.status(200).json({
            activeIssues: activeIssues
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
}; // Cancel a transaction


exports.cancelTransaction = function _callee2(req, res) {
  var transactionId, transaction;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          transactionId = req.body.transactionId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Transaction.findById(transactionId));

        case 4:
          transaction = _context2.sent;

          if (transaction) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: 'Transaction not found'
          }));

        case 7:
          // Update transaction status
          transaction.status = 'Canceled';
          _context2.next = 10;
          return regeneratorRuntime.awrap(transaction.save());

        case 10:
          res.status(200).json({
            message: 'Transaction canceled successfully',
            transaction: transaction
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 13]]);
}; // Get overdue returns with fine calculation


exports.getOverdueReturns = function _callee3(req, res) {
  var currentDate, overdueTransactions, overdueWithFines;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Get the current date
          currentDate = new Date(); // Find transactions where the return date is past the current date and the book is still not returned

          _context3.next = 4;
          return regeneratorRuntime.awrap(Transaction.find({
            returnDate: {
              $lt: currentDate
            },
            status: 'Issued'
          }).populate('bookId').populate('memberId'));

        case 4:
          overdueTransactions = _context3.sent;
          // Calculate fines for overdue transactions
          overdueWithFines = overdueTransactions.map(function (transaction) {
            var daysOverdue = Math.ceil((currentDate - new Date(transaction.returnDate)) / (1000 * 3600 * 24));
            var fineAmount = daysOverdue > 0 ? daysOverdue * 10 : 0; // $10 fine per day

            return _objectSpread({}, transaction._doc, {
              fineAmount: fineAmount
            });
          });
          res.status(200).json({
            overdueReturns: overdueWithFines
          });
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Check book availability


exports.checkBookAvailability = function _callee4(req, res) {
  var bookName, book;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          bookName = req.query.bookName;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Book.findOne({
            title: bookName
          }));

        case 4:
          book = _context4.sent;

          if (book && book.availableCopies > 0) {
            res.status(200).json({
              available: true,
              message: 'Book is available'
            });
          } else {
            res.status(200).json({
              available: false,
              message: 'Book is not available'
            });
          }

          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: _context4.t0.message
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Issue a book


exports.issueBook = function _callee5(req, res) {
  var _req$body, bookId, memberId, issueDate, returnDate, book, member, transaction;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, bookId = _req$body.bookId, memberId = _req$body.memberId, issueDate = _req$body.issueDate, returnDate = _req$body.returnDate;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Book.findById(bookId));

        case 4:
          book = _context5.sent;

          if (!(!book || book.status !== 'Available')) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            error: 'Book is not available'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(Member.findById(memberId));

        case 9:
          member = _context5.sent;

          if (member) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: 'Member not found'
          }));

        case 12:
          // Create transaction
          transaction = new Transaction({
            bookId: bookId,
            memberId: memberId,
            issueDate: issueDate,
            returnDate: returnDate,
            status: 'Issued'
          });
          _context5.next = 15;
          return regeneratorRuntime.awrap(transaction.save());

        case 15:
          // Update book status
          book.status = 'Issued';
          _context5.next = 18;
          return regeneratorRuntime.awrap(book.save());

        case 18:
          res.status(200).json({
            message: 'Book issued successfully',
            transaction: transaction
          });
          _context5.next = 24;
          break;

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            error: _context5.t0.message
          });

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 21]]);
}; // Return a book


exports.returnBook = function _callee6(req, res) {
  var _req$body2, transactionId, returnDate, remarks, transaction, book;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, transactionId = _req$body2.transactionId, returnDate = _req$body2.returnDate, remarks = _req$body2.remarks;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Transaction.findById(transactionId).populate('bookId'));

        case 4:
          transaction = _context6.sent;

          if (transaction) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: 'Transaction not found'
          }));

        case 7:
          if (!(transaction.status !== 'Issued')) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            error: 'Transaction is not active for return'
          }));

        case 9:
          // Update transaction
          transaction.returnDate = returnDate;
          transaction.remarks = remarks || '';
          transaction.status = 'Returned';
          _context6.next = 14;
          return regeneratorRuntime.awrap(transaction.save());

        case 14:
          _context6.next = 16;
          return regeneratorRuntime.awrap(Book.findById(transaction.bookId._id));

        case 16:
          book = _context6.sent;
          book.availableCopies += 1;
          _context6.next = 20;
          return regeneratorRuntime.awrap(book.save());

        case 20:
          res.status(200).json({
            message: 'Book returned successfully',
            transaction: transaction
          });
          _context6.next = 26;
          break;

        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json({
            error: _context6.t0.message
          });

        case 26:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 23]]);
}; // Pay fine for a transaction


exports.payFine = function _callee7(req, res) {
  var _req$body3, transactionId, finePaid, transaction;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, transactionId = _req$body3.transactionId, finePaid = _req$body3.finePaid;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Transaction.findById(transactionId));

        case 4:
          transaction = _context7.sent;

          if (transaction) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: 'Transaction not found'
          }));

        case 7:
          if (!(transaction.status === 'Returned')) {
            _context7.next = 9;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            error: 'Fine has already been paid for this transaction'
          }));

        case 9:
          // Update fine and status if paid
          transaction.finePaid = finePaid;
          transaction.status = finePaid ? 'Returned' : 'Issued';
          _context7.next = 13;
          return regeneratorRuntime.awrap(transaction.save());

        case 13:
          res.status(200).json({
            message: 'Fine paid successfully',
            transaction: transaction
          });
          _context7.next = 19;
          break;

        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](1);
          res.status(500).json({
            error: _context7.t0.message
          });

        case 19:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

exports.searchBooks = function _callee8(req, res) {
  var _req$query, title, author, serialNumber, query, books;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$query = req.query, title = _req$query.title, author = _req$query.author, serialNumber = _req$query.serialNumber;
          query = {};
          if (title) query.title = new RegExp(title, 'i');
          if (author) query.author = new RegExp(author, 'i');
          if (serialNumber) query.isbn = serialNumber;
          _context8.next = 8;
          return regeneratorRuntime.awrap(Book.find(query));

        case 8:
          books = _context8.sent;
          res.status(200).json({
            books: books
          });
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            error: _context8.t0.message
          });

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 12]]);
};