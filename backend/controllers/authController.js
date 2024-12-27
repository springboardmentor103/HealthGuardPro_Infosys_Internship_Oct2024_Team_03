const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailService');

// Debug middleware
const debugLog = (req, res, next) => {
    console.log('Auth Controller:', {
        path: req.path,
        method: req.method,
        body: req.body
    });
    next();
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                username: user.username 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                userId: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
};

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields' 
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [
                { email: email },
                { username: username }
            ]
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
            });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password, // Password will be hashed by the pre-save middleware
        });

        await newUser.save();

        // Create token
        const token = jwt.sign(
            { 
                userId: newUser._id, 
                email: newUser.email,
                username: newUser.username 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            success: true,
            message: 'Registration successful',
            token,
            user: {
                userId: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Registration failed. Please try again.' 
        });
    }
};

const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId)
            .select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        res.json({ user });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ 
            message: 'Invalid or expired token' 
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ 
                message: 'No account found with this email' 
            });
        }

        // Generate reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send reset email
        await sendVerificationEmail(email, resetToken);

        res.json({ 
            message: 'Password reset instructions sent to your email' 
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ 
            message: 'Failed to process request' 
        });
    }
};

// Export all controller functions
module.exports = {
    login,
    signup,
    verifyToken,
    forgotPassword,
    debugLog
};
