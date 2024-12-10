// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const navigate = useNavigate();

    // Sample credentials for demo purposes
    const adminCredentials = { username: 'admin', password: 'admin123', role: 'admin' };
    const userCredentials = { username: 'user', password: 'user123', role: 'user' };

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple authentication check
        if (username === adminCredentials.username && password === adminCredentials.password && role === 'admin') {
            navigate('/admin');
        } else if (username === userCredentials.username && password === userCredentials.password && role === 'user') {
            navigate('/user');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
