import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MasterListBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch master list of books from the backend
        axios.get('/api/master-list-books')  // Assuming the API endpoint
            .then(response => {
                setBooks(response.data.books);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Master List of Books</h2>
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
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>{book.serialNo}</td>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.status}</td>
                            <td>{book.cost}</td>
                            <td>{new Date(book.procurementDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListBooks;
