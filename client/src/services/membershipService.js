// frontend/src/services/membershipService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/membership';

export const addMembership = async (membershipData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, membershipData);
        return response.data;
    } catch (error) {
        console.error("Error adding membership:", error);
        throw error;
    }
};
