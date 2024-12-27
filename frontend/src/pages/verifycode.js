import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './verifycode.css';
// import { Link } from 'react-router-dom'; 
import { EmailContext } from './EmailContext';

const Verifycode = () => {
    const { email } = useContext(EmailContext);
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            setError('Please enter the verification code');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });
            const result = await response.json();
            
            if (response.ok) {
                console.log('Code verified:', result.message);
                navigate('/Setpassword');
            } else {
                setError(result.message || 'Invalid verification code');
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setError('Failed to verify code. Please try again.');
        }
    };

    const handleResend = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('New verification code has been sent!');
            } else {
                alert(result.message || 'Failed to resend code');
            }
        } catch (error) {
            console.error('Error resending code:', error);
            alert('Failed to resend code. Please try again.');
        }
    };

    return (
        <div className="verifycode-unique-body">
            <div className="verifycode-unique-container">
                <div className="verifycode-unique-form-wrapper">
                    <a href="/login" className="verifycode-unique-back-link">← Back to login</a>
                    <h2 className="verifycode-unique-title">Verify Code</h2>
                    <p className="verifycode-unique-message">An authentication code has been sent to your email.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="verifycode-unique-form-group">
                            <input
                                type="text"
                                id="verificationCode"
                                placeholder=" "
                                value={code}
                                onChange={handleCodeChange}
                                required
                                className="verifycode-unique-input"
                            />
                            <label className="verifycode-unique-label" htmlFor="verificationCode">Enter Code</label>
                        </div>
                        {error && <p className="verifycode-unique-error">{error}</p>}
                        <p className="verifycode-unique-resend-text">
                            Didn’t receive a code?{' '}
                            <span onClick={handleResend} className="verifycode-unique-resend-link">Resend</span>
                        </p>
                        <button type="submit" className="verifycode-unique-btn">Verify</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

 
export default Verifycode;