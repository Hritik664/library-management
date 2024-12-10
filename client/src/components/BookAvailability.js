import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAvailability = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Simulate fetching user role
        const userRole = localStorage.getItem('userRole'); // Example: "admin" or "user"
        setIsAdmin(userRole === 'admin');
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        setBooks([]);

        try {
            const response = await axios.get(`/api/books?search=${searchTerm}`);
            setBooks(response.data.books);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    };

    const handleIssueBook = async (bookId) => {
        try {
            const response = await axios.post('/api/transactions/issue', { bookId });
            alert(`Book issued successfully: ${response.data.message}`);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to issue book');
        }
    };

    return (
        <div>
            <h2>Book Availability</h2>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter book name or author"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading books...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Serial Number</th>
                        <th>Availability</th>
                        {isAdmin && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.serialNumber}</td>
                                <td>{book.available ? 'Yes' : 'No'}</td>
                                {isAdmin && (
                                    <td>
                                        {book.available ? (
                                            <button onClick={() => handleIssueBook(book._id)}>
                                                Issue Book
                                            </button>
                                        ) : (
                                            <span>Not Available</span>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={isAdmin ? 5 : 4}>No books found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookAvailability;
