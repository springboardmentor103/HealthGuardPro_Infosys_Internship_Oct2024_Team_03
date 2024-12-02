import React,{useState} from "react";
import { Link } from 'react-router-dom';
import "./signup.css";
 
function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
      //  lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
            } else {
                alert(data.error || 'Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };


    return (
        <body className="signup">
            <div className="signup-container">
                <h2>Sign up</h2>
                <p>Let's get you all set up so you can access your personal account.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-container">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="firstName">Username</label>
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
                    <div className="input-container">
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="phoneNumber">Phone Number</label>
                    </div>
                    
                    <button type="submit" className="create-account-button">Create account</button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login" className="link">Login</Link>
                </p>
            </div>
        </body>
    );
}

export default SignupPage; 


/*    return (
        <div className ="setpass-page ">
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

export default SignupPage; */