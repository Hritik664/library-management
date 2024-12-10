import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/maintenance">Maintenance</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/transactions">Transactions</Link></li>
                    <li><Link to="/product-details">Product Details</Link></li>
                    <li><Link to="/overdue-returns">Overdue Returns</Link></li> {/* Link for overdue returns */}
                    {/* Add more links as needed */}
                </ul>
            </nav>
            <Link to="/">Log Out</Link>  {/* Link to log out */}
        </div>
    );
};

export default AdminDashboard;
