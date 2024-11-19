import React from "react";
import "./signup.css";

function SignupPage() {
    return (
        <div className="signup-page">
        <div className="signup container">
            <div className="signup-box">
                <h1>Signup</h1>
                <p>Let’s get you all set up so you can access your personal account.</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        type="text" 
                        placeholder="Enter your username" 
                        required 
                    />

                    <label htmlFor="email">Email Address</label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email address" 
                        required 
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        required 
                        minLength="8" 
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm your password" 
                        required 
                    />

                    <button type="submit">Sign Up</button>
                </form>
                <p className="login-text">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
        </div>
    );
}

export default SignupPage;