import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <PrivateRoute path="/admin" element={<AdminDashboard />} />
                <PrivateRoute path="/user" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
