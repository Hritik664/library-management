import React, { useEffect, useState } from 'react';
import { fetchMemberships } from '../api/membershipApi';

const MasterListMemberships = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the memberships data when the component mounts
    useEffect(() => {
        const getMemberships = async () => {
            try {
                const data = await fetchMemberships();
                setMemberships(data); // Store memberships in state
            } catch (err) {
                setError('Failed to fetch memberships');
            } finally {
                setLoading(false);
            }
        };

        getMemberships();
    }, []);

    // Render the component
    if (loading) {
        return <div>Loading memberships...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Master List of Memberships</h2>
            <table>
                <thead>
                    <tr>
                        <th>Membership ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Contact Address</th>
                        <th>Aadhar Card No</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Amount Pending (Fine)</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships.map((membership) => (
                        <tr key={membership._id}>
                            <td>{membership.membershipId}</td>
                            <td>{membership.name}</td>
                            <td>{membership.contactNumber}</td>
                            <td>{membership.contactAddress}</td>
                            <td>{membership.aadharCardNo}</td>
                            <td>{new Date(membership.startDate).toLocaleDateString()}</td>
                            <td>{new Date(membership.endDate).toLocaleDateString()}</td>
                            <td>{membership.status}</td>
                            <td>{membership.amountPending || '0'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListMemberships;
