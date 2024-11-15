import React, { useState } from "react";
import "./SetPassword.css";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault(); 
    if (password === confirmPassword) {
      console.log("Password successfully set:", password);
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="container">
      <h1>Set a Password</h1>
      <p>Your previous password has been reset.
         Please set a new password for your account.</p>
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

        <button
          type="submit"
          onClick={handleClick}
          className="set-password-btn"
        >
          Set Password
        </button>
      </form>
    </div>
  );
};


export default SetPassword;
