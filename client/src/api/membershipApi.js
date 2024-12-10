import axios from 'axios';

// Fetch all memberships
export const fetchMemberships = async () => {
    try {
        const response = await axios.get('/api/memberships');
        return response.data;
    } catch (error) {
        console.error('Error fetching memberships:', error);
        throw new Error(error.message);
    }
};
