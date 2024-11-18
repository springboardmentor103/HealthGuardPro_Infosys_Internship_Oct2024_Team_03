import React, { useState } from 'react';
import './forgotpassword.css';
 
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
   
    setMessage('If an account with that email exists, you will receive a password reset link.');
  };
 
  return (
    <div className="forgot-password-page">
    <div className="container">
      <h2>Forgot your password?</h2>
      <p>Don't worry, it happens to everyone. Enter your email below to recover your password.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Display success message */}
      <a href="/login" className="back-link">Back to login</a>
    </div>
    </div>
  );
}
export default ForgotPassword;