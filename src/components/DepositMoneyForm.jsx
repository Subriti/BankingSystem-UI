import React, { useState } from 'react';
import axios from 'axios';

const DepositMoneyForm = () => {
  const [amount, setAmount] = useState(0);
  const [transactionRemarks, setTransactionRemarks] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to retrieve session ID from cookies
  const getStoredSessionID = () => {
    // Get all cookies
    const cookies = document.cookie.split(';');
  
    // Iterate through each cookie to find the one containing the session ID
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
  
      // Check if the cookie starts with 'SessionID='
      if (cookie.startsWith('SessionID=')) {
        // Extract and return the session ID from the cookie
        return cookie.substring('SessionID='.length, cookie.length);
      }
    }
  
    // Return null if the session ID is not found
    return null;
  };  

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setTransactionRemarks(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  // Retrieve the JWT token from local storage
  //const token = localStorage.getItem('jwTtoken');

  
  const sessionID = getStoredSessionID(); // Call the function here

  // Set the Authorization header with the JWT token
  const config = {
    headers: {
      //'Authorization': `Bearer ${token}`
      'Session-ID': sessionID
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5224/Transaction/deposit?accountNumber='+accountNumber, {
        amount,
        transactionRemarks
      }, config);
      console.log('Deposit successful:', response.data);
      // Optionally, you can handle success here (e.g., show a success message)
    } catch (error) {
      console.error('Deposit failed:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
    } finally {
      setLoading(false);
      // Reset form fields after submission
      setAmount(0);
      setTransactionRemarks('');
      setAccountNumber('');
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Deposit Money</h2>
      <form onSubmit={handleSubmit} className="withdraw-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="remarks">Transaction Remarks:</label>
          <input
            type="text"
            id="remarks"
            value={transactionRemarks}
            onChange={handleRemarksChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Deposit'}
        </button>
      </form>
    </div>
  );
};

export default DepositMoneyForm;