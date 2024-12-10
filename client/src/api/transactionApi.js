import axios from 'axios';

export const cancelTransaction = async (transactionId) => {
    try {
        const response = await axios.post('/api/transactions/cancel', { transactionId });
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw new Error(error.response.data.error || 'Failed to cancel transaction');
    }
};

// Return Book API
export const returnBookApi = async (data) => {
    try {
        const response = await axios.post('/api/transactions/return', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Failed to return book');
    }
};

// Fetch Active Transactions API
export const getTransactions = async (filters = {}) => {
    try {
        const response = await axios.get('/api/transactions', { params: filters });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Failed to fetch transactions');
    }
};



export const payFine = async (transactionId, finePaid) => {
    try {
        const response = await axios.post('/api/transactions/pay-fine', {
            transactionId,
            finePaid,
        });
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        throw new Error(error.response.data.error || 'Failed to pay fine');
    }
};
