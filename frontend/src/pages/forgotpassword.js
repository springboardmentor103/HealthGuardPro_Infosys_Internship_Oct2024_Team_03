import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './forgotpassword.css';  
import { EmailContext } from './EmailContext';

function ForgotPassword() {
  const { setEmail } = useContext(EmailContext);
  const [inputEmail, setInputEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail }),
      });
      const result = await response.json();
      if (response.ok) {
        setEmail(inputEmail); // Save email to context after successful API call
        console.log('Verification code sent:', result.message);
        navigate('/verifycode');
      } else {
        console.error('Error:', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Failed to send verification code. Please try again.');
    }
  };

  return (
    <div className="body-forgotpass">
    <div className="forgotpassword-container">
        <div className="forgot-password-box">
            <h2 className="forgotpassword-heading">Forgot your password?</h2>
            <p className="forgotpassword-description">
                Don't worry, happens to all of us. Enter your email below to recover your password.
            </p>
            <form onSubmit={handleSubmit} className="forgotpassword-form">
                <div className="forgotpassword-input-group">
                    <input
                        type="email"
                        id="email"
                        value={inputEmail}
                        onChange={handleEmailChange}
                        required
                        className={inputEmail ? 'forgotpassword-filled' : ''}
                    />
                    <label htmlFor="email" className="forgotpassword-label">Email</label>
                </div>
                <button type="submit" className="forgotpassword-submit-button">Submit</button>
            </form>
            <Link to="/login" className="forgotpassword-login-alternative">← Back to login</Link>
        </div>
    </div>
    </div>
);
}

export default ForgotPassword;

 
