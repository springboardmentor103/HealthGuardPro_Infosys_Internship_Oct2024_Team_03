import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./signup.css";
 
function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                // Store the token and user data
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userId', data.user.userId);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('username', data.user.username);
                
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h2>Sign up</h2>
                <p>Let's get you all set up so you can access your personal account.</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-container">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength="3"
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="create-account-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login" className="link">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;