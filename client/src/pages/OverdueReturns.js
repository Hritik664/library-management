import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OverdueReturns = () => {
    const [overdueReturns, setOverdueReturns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch overdue returns from the backend API
        const fetchOverdueReturns = async () => {
            try {
                const response = await axios.get('/api/reports/overdue-returns');
                setOverdueReturns(response.data.overdueReturns);
            } catch (error) {
                console.error("Error fetching overdue returns:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOverdueReturns();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Overdue Returns</h1>
            <table>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Member Name</th>
                        <th>Due Date</th>
                        <th>Fine Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {overdueReturns.length > 0 ? (
                        overdueReturns.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.bookId.name}</td>
                                <td>{transaction.memberId.name}</td>
                                <td>{new Date(transaction.returnDate).toLocaleDateString()}</td>
                                <td>${transaction.fineAmount}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No overdue returns</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OverdueReturns;
