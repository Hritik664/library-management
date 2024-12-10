const express = require('express');
const { addBook, updateBook, deleteBook, getReports } = require('../controllers/adminController');
const router = express.Router();

router.post('/add-book', addBook);
router.put('/update-book/:id', updateBook);
router.delete('/delete-book/:id', deleteBook);
router.get('/reports', getReports);
router.get('/categories', getCategories);

module.exports = router;
