"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payFine = exports.getTransactions = exports.returnBookApi = exports.cancelTransaction = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cancelTransaction = function cancelTransaction(transactionId) {
  var response;
  return regeneratorRuntime.async(function cancelTransaction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post('/api/transactions/cancel', {
            transactionId: transactionId
          }));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.response.data);
          throw new Error(_context.t0.response.data.error || 'Failed to cancel transaction');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Return Book API


exports.cancelTransaction = cancelTransaction;

var returnBookApi = function returnBookApi(data) {
  var response;
  return regeneratorRuntime.async(function returnBookApi$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post('/api/transactions/return', data));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0.response.data.error || 'Failed to return book');

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Fetch Active Transactions API


exports.returnBookApi = returnBookApi;

var getTransactions = function getTransactions() {
  var filters,
      response,
      _args3 = arguments;
  return regeneratorRuntime.async(function getTransactions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          filters = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get('/api/transactions', {
            params: filters
          }));

        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          throw new Error(_context3.t0.response.data.error || 'Failed to fetch transactions');

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getTransactions = getTransactions;

var payFine = function payFine(transactionId, finePaid) {
  var response;
  return regeneratorRuntime.async(function payFine$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post('/api/transactions/pay-fine', {
            transactionId: transactionId,
            finePaid: finePaid
          }));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.response.data);
          throw new Error(_context4.t0.response.data.error || 'Failed to pay fine');

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.payFine = payFine;