import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./setpassword.css";
// import { Link } from 'react-router-dom';
import { EmailContext } from './EmailContext'; 
 
const SetPassword = () => {
  const { email } = useContext(EmailContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};

const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
};

const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase || !hasLowerCase) {
        return 'Password must contain both uppercase and lowercase letters';
    }
    if (!hasNumbers) {
        return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
        return 'Password must contain at least one special character';
    }
    return '';
};

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validatePassword(password);
    if (validationError) {
        setErrorMessage(validationError);
        return;
    }

    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/set-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        
        if (response.ok) {
            console.log('Password updated:', result.message);
            alert('Password successfully updated!');
            navigate('/login');
        } else {
            setErrorMessage(result.message || 'Failed to update password');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        setErrorMessage('Failed to update password. Please try again.');
    }
};

  /* const handleClick = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log("Password successfully set:", password);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("Passwords do not match!");
    }
  }; */

  return (
    <body className="setpassword-page">
        <div className="setpassword-container">
            <div className="setpassword-form-wrapper">
                <h2 className="setpassword-header">Set a password</h2>
                <p className="setpassword-description">Your previous password has been reset. Please set a new password for your account.</p>
                <form className="setpassword-form" onSubmit={handleSubmit}>
                    <div className="setpassword-form-group">
                        <input
                            type="password"
                            id="newPassword"
                            className="setpassword-input"
                            placeholder=" "
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <label htmlFor="newPassword" className="setpassword-label">Create Password</label>
                    </div>
                    <div className="setpassword-form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            className="setpassword-input"
                            placeholder=" "
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <label htmlFor="confirmPassword" className="setpassword-label">Re-enter Password</label>
                    </div>
                    {errorMessage && <p className="setpassword-error-message">{errorMessage}</p>}
                    <button type="submit" className="setpassword-submit-btn">Set password</button>
                </form>
            </div>
        </div>
    </body>
);
};

export default SetPassword;
