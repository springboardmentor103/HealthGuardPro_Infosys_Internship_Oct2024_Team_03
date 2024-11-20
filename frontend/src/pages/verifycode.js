import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verifycode.css';
 
const Verifycode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
 
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.trim() === '') {
            alert('Please enter the verification code.');
        } else {
            navigate('/set-password');
        }
    };
 
    const handleResend = () => {
        alert('Verification code resent!');
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