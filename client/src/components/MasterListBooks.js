import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MasterListBooks = () => {
    // State variables to manage the list of books and filter
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch books when the component is mounted
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/books');  // Assuming the backend is set to respond to this route
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);  // Empty dependency array means this runs once when the component mounts

    // Error message display
    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Loading message display
    if (loading) {
        return <div>Loading books...</div>;
    }

    return (
        <div>
            <h2>Master List of Books</h2>
            {/* Table to display books */}
            <table>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name of Book</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Procurement Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="7">No books available</td>
                        </tr>
                    ) : (
                        books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.serialNo}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.status}</td>
                                <td>{book.cost}</td>
                                <td>{new Date(book.procurementDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListBooks;
