const Book = require('../models/Book');
const Movie = require('../models/Movie');
const Membership = require('../models/Membership');
const Transaction = require('../models/Transaction');
const IssueRequest = require('../models/IssueRequest');

// Get Master List of Books
exports.getBooksReport = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Master List of Movies
exports.getMoviesReport = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Master List of Memberships
exports.getMembershipsReport = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Active Issues
exports.getActiveIssuesReport = async (req, res) => {
    try {
        const activeIssues = await Transaction.find({ status: 'Issued' });
        res.status(200).json(activeIssues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Overdue Returns
exports.getOverdueReturnsReport = async (req, res) => {
    try {
        const overdueReturns = await Transaction.find({
            returnDate: { $lt: new Date() },
            status: 'Issued'
        });
        res.status(200).json(overdueReturns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Issue Requests
exports.getIssueRequestsReport = async (req, res) => {
    try {
        const issueRequests = await IssueRequest.find();
        res.status(200).json(issueRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
