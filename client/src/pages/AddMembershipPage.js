// frontend/src/pages/AddMembershipPage.js

import React, { useState } from 'react';
import { addMembership } from '../services/membershipService';

const AddMembershipPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactName: '',
        contactAddress: '',
        aadharCardNo: '',
        startDate: '',
        endDate: '',
        membershipType: 'sixMonths',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addMembership(formData);
            alert(response.message);
        } catch (error) {
            alert("Error adding membership");
        }
    };

    return (
        <div>
            <h2>Add Membership</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Contact Name" />
                <input type="text" name="contactAddress" value={formData.contactAddress} onChange={handleChange} placeholder="Contact Address" />
                <input type="text" name="aadharCardNo" value={formData.aadharCardNo} onChange={handleChange} placeholder="Aadhar Card No" />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

                <div>
                    <input type="radio" name="membershipType" value="sixMonths" onChange={handleChange} checked={formData.membershipType === 'sixMonths'} /> 6 Months
                    <input type="radio" name="membershipType" value="oneYear" onChange={handleChange} checked={formData.membershipType === 'oneYear'} /> 1 Year
                    <input type="radio" name="membershipType" value="twoYears" onChange={handleChange} checked={formData.membershipType === 'twoYears'} /> 2 Years
                </div>

                <button type="submit">Add Membership</button>
            </form>
        </div>
    );
};

export default AddMembershipPage;
