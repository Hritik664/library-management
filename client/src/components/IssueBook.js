import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IssueBook = () => {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Fetch available books
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books/available');
                setBooks(response.data);
            } catch (error) {
                setError('Failed to fetch books');
            }
        };

        const fetchMembers = async () => {
            try {
                const response = await axios.get('/api/members');
                setMembers(response.data);
            } catch (error) {
                setError('Failed to fetch members');
            }
        };

        fetchBooks();
        fetchMembers();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBook || !selectedMember || !issueDate || !returnDate) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('/api/transactions/issue', {
                bookId: selectedBook,
                memberId: selectedMember,
                issueDate,
                returnDate,
            });

            setMessage(response.data.message);
            setError('');
            setTimeout(() => {
                navigate('/transactions');
            }, 2000);
        } catch (err) {
            setMessage('');
            setError(err.response.data.error || 'Failed to issue book');
        }
    };

    return (
        <div>
            <h2>Issue Book</h2>
            <form onSubmit={handleSubmit}>
                {/* Select Book */}
                <div>
                    <label htmlFor="book">Select Book:</label>
                    <select
                        id="book"
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                    >
                        <option value="">--Select a Book--</option>
                        {books.map((book) => (
                            <option key={book._id} value={book._id}>
                                {book.title} - {book.serialNumber}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Select Member */}
                <div>
                    <label htmlFor="member">Select Member:</label>
                    <select
                        id="member"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    >
                        <option value="">--Select a Member--</option>
                        {members.map((member) => (
                            <option key={member._id} value={member._id}>
                                {member.name} - {member.membershipId}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Issue Date */}
                <div>
                    <label htmlFor="issueDate">Issue Date:</label>
                    <input
                        type="date"
                        id="issueDate"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </div>

                {/* Return Date */}
                <div>
                    <label htmlFor="returnDate">Return Date:</label>
                    <input
                        type="date"
                        id="returnDate"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>

                <button type="submit">Issue Book</button>
            </form>

            {/* Success or Error Message */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default IssueBook;
