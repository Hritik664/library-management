const express = require('express');
const { checkBookAvailability, searchBooks, issueBook, getActiveIssues, cancelTransaction, returnBook } = require('../controllers/transactionController');
const router = express.Router();


router.get('/check-availability', checkBookAvailability);
router.get('/search-books', searchBooks);
router.get('/active-issues', getActiveIssues);
router.post('/cancel', cancelTransaction);

router.post('/issue', issueBook);
router.post('/return', returnBook);
router.post('/pay-fine', payFine);

module.exports = router;
