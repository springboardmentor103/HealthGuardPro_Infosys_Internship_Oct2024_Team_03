import React from "react";
import "./verify.css";
import { Link } from 'react-router-dom';  
const VerifyCode = () => {
  return (
    <div className="verify-code-page">
      <div className="container">
        <h2>Verify Code</h2>
      <p>An authentication code has been sent to your email.</p>
        <form>
          <label htmlFor="code">Enter Code</label>
          <input
            type="text"
            id="code"
            placeholder="Enter Code"
            className="code-input"
          />
          <p className="resend-text">
            Didn’t receive a code? <span className="resend-link">Resend</span>
          </p>
          <Link to="/SetPassword" className="setpassword-link">
  <button type="button">Verify</button>
</Link>
        </form>
        <a href="/login" className="back-link">
          Back to login
        </a>
      </div>
    </div>
  );
};

export default VerifyCode;
