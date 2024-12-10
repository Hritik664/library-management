"use strict";

var express = require('express');

var _require = require('../controllers/transactionController'),
    checkBookAvailability = _require.checkBookAvailability,
    searchBooks = _require.searchBooks,
    issueBook = _require.issueBook,
    getActiveIssues = _require.getActiveIssues,
    cancelTransaction = _require.cancelTransaction,
    returnBook = _require.returnBook;

var router = express.Router();
router.get('/check-availability', checkBookAvailability);
router.get('/search-books', searchBooks);
router.get('/active-issues', getActiveIssues);
router.post('/cancel', cancelTransaction);
router.post('/issue', issueBook);
router.post('/return', returnBook);
router.post('/pay-fine', payFine);
module.exports = router;