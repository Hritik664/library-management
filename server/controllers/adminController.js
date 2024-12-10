const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCategories = (req, res) => {
    const categories = [
      { codeFrom: 'SC(B/M)000001', codeTo: 'SC(B/M)000004', category: 'Science' },
      { codeFrom: 'EC(B/M)000001', codeTo: 'EC(B/M)000004', category: 'Economics' },
      { codeFrom: 'FC(B/M)000001', codeTo: 'FC(B/M)000004', category: 'Fiction' },
      { codeFrom: 'CH(B/M)000001', codeTo: 'CH(B/M)000004', category: 'Children' },
      { codeFrom: 'PD(B/M)000001', codeTo: 'PD(B/M)000004', category: 'Personal Development' },
    ];
    res.json(categories);
  };

exports.getReports = async (req, res) => {
  // Add logic for generating reports
};
