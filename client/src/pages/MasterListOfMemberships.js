import React, { useEffect, useState } from 'react';
import '../styles/MasterList.css';

const MasterListOfMemberships = () => {
    const [memberships, setMemberships] = useState([]);

    useEffect(() => {
        // Fetch membership data from backend
        fetch('http://localhost:5000/api/memberships/master-list')
            .then(response => response.json())
            .then(data => setMemberships(data))
            .catch(error => console.error('Error fetching memberships:', error));
    }, []);

    return (
        <div>
            <h1>Master List of Memberships</h1>
            <table>
                <thead>
                    <tr>
                        <th>Membership ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Contact Address</th>
                        <th>Aadhar Card No</th>
                        <th>Status</th>
                        <th>Amount Pending</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships.map((membership) => (
                        <tr key={membership._id}>
                            <td>{membership.memberId}</td>
                            <td>{membership.firstName} {membership.lastName}</td>
                            <td>{membership.contactNumber}</td>
                            <td>{membership.contactAddress}</td>
                            <td>{membership.aadharCardNo}</td>
                            <td>{membership.status}</td>
                            <td>{membership.amountPending}</td>
                            <td>{new Date(membership.startDate).toLocaleDateString()}</td>
                            <td>{new Date(membership.endDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterListOfMemberships;
