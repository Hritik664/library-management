import React, { useState } from 'react';
import { cancelTransaction } from '../api/transactionApi';

const CancelTransaction = () => {
    // State hooks for handling the input and feedback messages
    const [transactionId, setTransactionId] = useState(''); // Transaction ID input
    const [message, setMessage] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle the cancellation process
    const handleCancel = async () => {
        if (!transactionId) {
            setError('Transaction ID is required');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await cancelTransaction(transactionId); // API call to cancel the transaction
            setMessage(response.message); // Success message from the backend
            setError('');
        } catch (err) {
            setMessage('');
            setError(err.message || 'An error occurred while canceling the transaction.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h2>Cancel Transaction</h2>

            <div>
                <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
                />
            </div>

            <button
                onClick={handleCancel}
                disabled={loading} // Disable the button while loading
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '10px'
                }}
            >
                {loading ? 'Processing...' : 'Cancel Transaction'}
            </button>

            {/* Displaying messages */}
            {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        </div>
    );
};

export default CancelTransaction;
