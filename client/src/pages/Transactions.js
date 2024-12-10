import React, { useState, useEffect } from 'react';
import axios from 'axios';

const checkAvailability = async () => {
  const response = await axios.get(`http://localhost:5000/api/transactions/check-availability?bookName=${bookName}`);
  alert(response.data.message);
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  const searchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/search-books?title=${searchTerm}`);
      setBooks(response.data.books);
    } catch (error) {
      console.error(error);
      setMessage('Error searching books');
    }
  };

  const issueBook = async (serialNumber) => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions/issue-book', { serialNumber, userId: '12345' });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error issuing book');
    }
  };

  return (
    <div>
      <h1>Transactions</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            {book.title} by {book.author} - {book.availableCopies > 0 ? 'Available' : 'Not Available'}
            {book.availableCopies > 0 && (
              <button onClick={() => issueBook(book.isbn)}>Issue</button>
            )}
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default Transactions;
