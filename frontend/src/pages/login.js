import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const rememberMeEnabled = localStorage.getItem('rememberMe');
    
    if (token && rememberMeEnabled) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.trim(),
                password: password
            })
        });

        const data = await response.json();
        
        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Login failed');
        }

        // Save auth data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.user.userId);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);

        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        navigate('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="body-login">
      <div className="login">
        <div className="login-container">
          <h2>Login</h2>
          <p>Login to access your account</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <label>Email</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <label>Password</label>
            </div>

            <div className="options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <p className="signup-text">
              Don't have an account?{' '}
              <Link to="/signup" className="signup-link">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
