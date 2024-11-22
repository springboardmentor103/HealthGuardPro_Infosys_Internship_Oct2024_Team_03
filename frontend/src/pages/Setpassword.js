import React, { useState } from "react";
import "./setpassword.css";


const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log("Password successfully set:", password);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("Passwords do not match!");
    }
  };

  return (
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

          <button className="set-password-btn" onClick={handleClick}>
            Set password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
