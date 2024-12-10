const express = require('express');
const router = express.Router();
const Book = require('../models/Book');  // Assuming you have a Book model

// Get the master list of books
router.get('/master-list-books', async (req, res) => {
  try {
    const books = await Book.find({}); // Get all books from the database
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();  // Fetches all books from the database
    res.json(books);  // Sends the books data back as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
