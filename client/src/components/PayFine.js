import React, { useState } from 'react';
import { payFine } from '../api/transactionApi';

const PayFine = () => {
    const [transactionId, setTransactionId] = useState('');
    const [fineAmount, setFineAmount] = useState(0);
    const [finePaid, setFinePaid] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePayFine = async () => {
        try {
            const response = await payFine(transactionId, finePaid);
            setMessage(response.message);
            setError('');
        } catch (err) {
            setMessage('');
            setError(err.message);
        }
    };

    const handleCheckboxChange = () => {
        setFinePaid(!finePaid);
    };

    return (
        <div>
            <h2>Pay Fine</h2>
            <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Fine Amount"
                value={fineAmount}
                onChange={(e) => setFineAmount(e.target.value)}
                disabled
            />
            <div>
                <label>
                    Fine Paid
                    <input
                        type="checkbox"
                        checked={finePaid}
                        onChange={handleCheckboxChange}
                    />
                </label>
            </div>
            <button onClick={handlePayFine}>Pay Fine</button>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PayFine;
