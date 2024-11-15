import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="login-container">
      <h2>   Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label><b>Email</b></label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-field">
          <label><b>Password</b></label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="options">
          <div>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe"> Remember me</label>
          </div>
          <a href="#forgot-password" className="forgot-password"><b></b>Forgot Password</a>
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="sign-up">
          Don’t have an account? <a href="#signup" className="sign-up-link">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;