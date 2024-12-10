import React, { useState, useEffect } from 'react';
import { returnBookApi } from '../api/transactionApi'; // API function for returning a book
import { getTransactions } from '../api/transactionApi'; // API function for fetching transactions

const ReturnBook = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch active transactions on component load
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions({ status: 'Issued' });
                setTransactions(response);
            } catch (err) {
                console.error('Error fetching transactions:', err.message);
            }
        };

        fetchTransactions();
    }, []);

    const handleReturnBook = async () => {
        try {
            if (!selectedTransaction || !returnDate) {
                setError('Please select a transaction and a return date.');
                return;
            }

            const response = await returnBookApi({
                transactionId: selectedTransaction,
                returnDate,
                remarks,
            });

            setMessage(response.message);
            setError('');
            setSelectedTransaction('');
            setReturnDate('');
            setRemarks('');

            // Refresh transactions
            const updatedTransactions = await getTransactions({ status: 'Issued' });
            setTransactions(updatedTransactions);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Return Book</h2>
            <div>
                <label>Select Transaction:</label>
                <select
                    value={selectedTransaction}
                    onChange={(e) => setSelectedTransaction(e.target.value)}
                >
                    <option value="">-- Select Transaction --</option>
                    {transactions.map((transaction) => (
                        <option key={transaction._id} value={transaction._id}>
                            {`Book: ${transaction.bookId.name} | Member: ${transaction.memberId.name} | Issue Date: ${new Date(
                                transaction.issueDate
                            ).toLocaleDateString()}`}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Return Date:</label>
                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
            </div>
            <div>
                <label>Remarks:</label>
                <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />
            </div>
            <button onClick={handleReturnBook}>Return Book</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ReturnBook;
