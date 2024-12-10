import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAdmin, isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/login'); // Redirect to the login page after logging out
    };

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Library Management System</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.link}>Home</Link>
                </li>

                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/transactions" style={styles.link}>Transactions</Link>
                        </li>
                        <li>
                            <Link to="/reports" style={styles.link}>Reports</Link>
                        </li>
                        <li>
                            <Link to="/return-book">Return Book</Link>
                        </li>
                        <li>
                            <Link to="/pay-fine">Pay Fine</Link>
                        </li>
                        {isAdmin && (
                            <>
                                <li>
                                    <Link to="/maintenance" style={styles.link}>Maintenance</Link>
                                </li>
                                <li>
                                    <Link to="/user-management" style={styles.link}>User Management</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/cancel-transaction" style={styles.link}>Cancel Transaction</Link>
                        </li>
                        <li>
                            <button onClick={logout} style={styles.logoutButton}>Log Out</button>
                        </li>
                    </>
                )}

                {!isLoggedIn && (
                    <li>
                        <Link to="/login" style={styles.link}>Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

// Inline styles for the Navbar
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px',
    },
    logo: {
        color: '#fff',
        fontSize: '24px',
    },
    navLinks: {
        listStyleType: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '16px',
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '16px',
    },
};

export default Navbar;
