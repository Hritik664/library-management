import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserHomePage.css'; // Optional for styling, create a CSS file if needed

const UserHomePage = () => {
    return (
        <div className="user-home">
            <header className="user-home-header">
                <h1>Welcome to the Library Management System</h1>
                <p>User Home Page</p>
            </header>
            <nav className="user-home-nav">
                <ul>
                    <li>
                        <Link to="/search-books">Is Book Available?</Link>
                    </li>
                    <li>
                        <Link to="/issue-book">Issue a Book</Link>
                    </li>
                    <li>
                        <Link to="/return-book">Return a Book</Link>
                    </li>
                    <li>
                        <Link to="/pay-fine">Pay Fine</Link>
                    </li>
                </ul>
            </nav>
            <footer className="user-home-footer">
                <Link to="/logout" className="logout-link">
                    Log Out
                </Link>
            </footer>
        </div>
    );
};

export default UserHomePage;
