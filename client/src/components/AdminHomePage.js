import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminHomePage.css'; // Optional for styling

const AdminHomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session or token (if applicable)
        localStorage.removeItem('authToken');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="admin-home-page">
            <header>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>
            </header>

            <div className="content">
                <div className="section">
                    <h2>Reports</h2>
                    <ul>
                        <li>
                            <Link to="/reports/books">Master List of Books</Link>
                        </li>
                        <li>
                            <Link to="/reports/movies">Master List of Movies</Link>
                        </li>
                        <li>
                            <Link to="/reports/memberships">Master List of Memberships</Link>
                        </li>
                        <li>
                            <Link to="/reports/active-issues">Active Issues</Link>
                        </li>
                        <li>
                            <Link to="/reports/overdue-returns">Overdue Returns</Link>
                        </li>
                        <li>
                            <Link to="/reports/issue-requests">Pending Issue Requests</Link>
                        </li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Transactions</h2>
                    <ul>
                        <li>
                            <Link to="/transactions/availability">Is Book Available?</Link>
                        </li>
                        <li>
                            <Link to="/transactions/issue">Issue Book</Link>
                        </li>
                        <li>
                            <Link to="/transactions/return">Return Book</Link>
                        </li>
                        <li>
                            <Link to="/transactions/pay-fine">Pay Fine</Link>
                        </li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Maintenance</h2>
                    <ul>
                        <li>
                            <Link to="/maintenance/membership/add">Add Membership</Link>
                        </li>
                        <li>
                            <Link to="/maintenance/membership/update">Update Membership</Link>
                        </li>
                        <li>
                            <Link to="/maintenance/books-movies/add">Add Book/Movie</Link>
                        </li>
                        <li>
                            <Link to="/maintenance/books-movies/update">Update Book/Movie</Link>
                        </li>
                        <li>
                            <Link to="/maintenance/user-management">User Management</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
