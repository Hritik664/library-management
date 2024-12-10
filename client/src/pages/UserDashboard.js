import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/categories')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>Book Categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        {category.category} (Code Range: {category.codeFrom} - {category.codeTo})
                    </li>
                ))}
            </ul>
            <a href="/">Log Out</a>
        </div>
    );
};

export default UserDashboard;
