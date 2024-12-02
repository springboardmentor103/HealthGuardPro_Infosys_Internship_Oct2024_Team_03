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


const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
    }
    try {
        const response = await fetch('http://localhost:5000/api/set-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }), // Include email and new password
        });
        const result = await response.json();
        if (response.ok) {
            console.log('Password updated:', result.message);
            navigate('/login');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error updating password:', error);
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


  /* return (
    <div className="setpass-page">
      <div className="setpass-container">
        <h1>Set a password</h1>
        <p>
          Your previous password has been reset. Please set a new password for
          your account.
        </p>
        <form className="password-form">
          <label htmlFor="new-password">Create Password</label>
          <input
            type="password"
            id="new-password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirm-password">Re-enter Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

                  
        <Link to="/login" className="set-password-btn">
  <button type="button">Set Password</button></Link>
        </form>
      </div>
    </div>
  );
};

export default SetPassword; */
