import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import './login.css'; // Ensure this file path is correct

 const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email      "
              
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="************"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="options">
             
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            {/* "Forgot Password" aligned on the same line */}
            <div className="forgot-password-container">
              <Link to="/forgotpassword" className="forgot-password">
                Forgot Password
              </Link>
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
          <p className="sign-up">
            Don’t have an account?{' '}
            
            <Link to="/signup" className="sign-up-link">
            Sign up
              </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
