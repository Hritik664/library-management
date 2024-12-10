import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'

const HomePage = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session (localStorage/sessionStorage) and redirect to login
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="homepage">
            <header>
                <h1>Welcome to the Library Management System</h1>
                {user && <h2>Logged in as: {user.role === 'admin' ? 'Admin' : 'User'}</h2>}
            </header>

            <nav>
                <ul>
                    {/* Common Links */}
                    <li><Link to="/chart">Chart</Link></li>
                    <li><Link to="/transactions">Transactions</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/maintenance">Maintenance</Link></li>

                    {/* Conditional Links Based on Role */}
                    {user && user.role === 'admin' && (
                        <>
                            <li><Link to="/admin-dashboard">Admin Home Page</Link></li>
                        </>
                    )}
                    {user && user.role === 'user' && (
                        <>
                            <li><Link to="/user-dashboard">User Home Page</Link></li>
                        </>
                    )}

                    {/* Logout Option */}
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Log Out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
