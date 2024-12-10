import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const thStyle = {
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
};

const tdStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
};


const ActiveIssues = () => {
    const [activeIssues, setActiveIssues] = useState([]);

    useEffect(() => {
        // Fetch active issues
        const fetchActiveIssues = async () => {
            try {
                const response = await axios.get('/api/transactions/active-issues', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setActiveIssues(response.data.activeIssues);
            } catch (error) {
                console.error('Error fetching active issues:', error);
            }
        };

        fetchActiveIssues();
    }, []);

    return (
        <div>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Book Name</th>
                        <th style={thStyle}>Category</th>
                        <th style={thStyle}>Member Name</th>
                        <th style={thStyle}>Member Contact</th>
                        <th style={thStyle}>Issue Date</th>
                        <th style={thStyle}>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {activeIssues.map((issue) => (
                        <tr key={issue._id}>
                            <td>{issue.bookId.name}</td>
                            <td>{issue.bookId.category}</td>
                            <td>{issue.memberId.name}</td>
                            <td>{issue.memberId.contactNumber}</td>
                            <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                            <td>{new Date(issue.returnDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveIssues;
