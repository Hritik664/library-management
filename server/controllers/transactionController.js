const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// Get active issues
exports.getActiveIssues = async (req, res) => {
    try {
        const activeIssues = await Transaction.find({ status: 'Issued' })
            .populate('bookId', 'name category')  // Populate book details
            .populate('memberId', 'name contactNumber');  // Populate member details

        res.status(200).json({ activeIssues });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel a transaction
exports.cancelTransaction = async (req, res) => {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Update transaction status
        transaction.status = 'Canceled';
        await transaction.save();

        res.status(200).json({ message: 'Transaction canceled successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get overdue returns with fine calculation
exports.getOverdueReturns = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Find transactions where the return date is past the current date and the book is still not returned
        const overdueTransactions = await Transaction.find({
            returnDate: { $lt: currentDate },
            status: 'Issued',
        }).populate('bookId').populate('memberId');

        // Calculate fines for overdue transactions
        const overdueWithFines = overdueTransactions.map(transaction => {
            const daysOverdue = Math.ceil((currentDate - new Date(transaction.returnDate)) / (1000 * 3600 * 24));
            const fineAmount = daysOverdue > 0 ? daysOverdue * 10 : 0; // $10 fine per day

            return {
                ...transaction._doc,
                fineAmount,
            };
        });

        res.status(200).json({ overdueReturns: overdueWithFines });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Check book availability
exports.checkBookAvailability = async (req, res) => {
    try {
        const { bookName } = req.query;
        const book = await Book.findOne({ title: bookName });

        if (book && book.availableCopies > 0) {
            res.status(200).json({ available: true, message: 'Book is available' });
        } else {
            res.status(200).json({ available: false, message: 'Book is not available' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Issue a book
exports.issueBook = async (req, res) => {
    const { bookId, memberId, issueDate, returnDate } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book || book.status !== 'Available') {
            return res.status(400).json({ error: 'Book is not available' });
        }

        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Create transaction
        const transaction = new Transaction({
            bookId,
            memberId,
            issueDate,
            returnDate,
            status: 'Issued',
        });
        await transaction.save();

        // Update book status
        book.status = 'Issued';
        await book.save();

        res.status(200).json({ message: 'Book issued successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Return a book
exports.returnBook = async (req, res) => {
    const { transactionId, returnDate, remarks } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId).populate('bookId');

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.status !== 'Issued') {
            return res.status(400).json({ error: 'Transaction is not active for return' });
        }

        // Update transaction
        transaction.returnDate = returnDate;
        transaction.remarks = remarks || '';
        transaction.status = 'Returned';

        await transaction.save();

        // Update book availability
        const book = await Book.findById(transaction.bookId._id);
        book.availableCopies += 1;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Pay fine for a transaction
exports.payFine = async (req, res) => {
    const { transactionId, finePaid } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.status === 'Returned') {
            return res.status(400).json({ error: 'Fine has already been paid for this transaction' });
        }

        // Update fine and status if paid
        transaction.finePaid = finePaid;
        transaction.status = finePaid ? 'Returned' : 'Issued';
        await transaction.save();

        res.status(200).json({ message: 'Fine paid successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.searchBooks = async (req, res) => {
    try {
        const { title, author, serialNumber } = req.query;
        const query = {};
        if (title) query.title = new RegExp(title, 'i');
        if (author) query.author = new RegExp(author, 'i');
        if (serialNumber) query.isbn = serialNumber;

        const books = await Book.find(query);
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
