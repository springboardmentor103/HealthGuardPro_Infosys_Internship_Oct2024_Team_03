require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const VerificationCode = require('./models/VerificationCode');
const User = require('./models/User');
const { sendVerificationEmail } = require('./config/emailConfig');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fitnessRoutes = require('./routes/fitnessRoutes');

const app = express();

// Debug middleware for all requests
app.use((req, res, next) => {
    console.log('Request received:', {
        method: req.method,
        path: req.path,
        fullPath: req.originalUrl,
        body: req.body
    });
    next();
});

// Essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Connect to Database
try {
    connectDB();
    console.log('Database connected successfully');
} catch (error) {
    console.error('Database connection failed:', error);
}

// Test routes - place these BEFORE mounting API routes
app.get('/test', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});

app.get('/api/test', (req, res) => {
    res.json({ success: true, message: 'API routes are working' });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/fitness', fitnessRoutes);

// Add password reset routes BEFORE the 404 handler
app.post('/api/send-code', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        // Generate a random 6-digit code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store the code in the database
        const newCode = new VerificationCode({
            email,
            code: verificationCode,
            createdAt: new Date()
        });
        await newCode.save();

        try {
            // Send email
            await sendVerificationEmail(email, verificationCode);
            res.json({ message: 'Verification code sent to your email' });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Delete the saved code if email fails
            await VerificationCode.deleteOne({ _id: newCode._id });
            res.status(500).json({ 
                message: 'Failed to send verification code email',
                error: emailError.message 
            });
        }
    } catch (error) {
        console.error('Error in send-code:', error);
        res.status(500).json({ 
            message: 'Failed to process request',
            error: error.message 
        });
    }
});

app.post('/api/verify-code', async (req, res) => {
    try {
        const { email, code } = req.body;
        
        const verificationRecord = await VerificationCode.findOne({ 
            email, 
            code 
        }).sort({ createdAt: -1 });

        if (!verificationRecord) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        const fifteenMinutes = 15 * 60 * 1000;
        if (Date.now() - verificationRecord.createdAt > fifteenMinutes) {
            return res.status(400).json({ message: 'Verification code has expired' });
        }

        res.json({ message: 'Code verified successfully' });
    } catch (error) {
        console.error('Error verifying code:', error);
        res.status(500).json({ message: 'Failed to verify code' });
    }
});

app.post('/api/set-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Here you would typically update the user's password in your database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update password (you should hash it first in production)
        user.password = password;
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
});

// AFTER all routes, add the 404 handler
app.use((req, res) => {
    console.log('404 hit for:', req.method, req.originalUrl);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Error handling middleware
app.use(errorHandler);

// Add this before your routes
app.use((req, res, next) => {
    console.log('Request received:', {
        method: req.method,
        path: req.path,
        body: req.body,
        headers: {
            authorization: req.headers.authorization ? 'Bearer token present' : 'No token',
            'content-type': req.headers['content-type']
        }
    });
    next();
});

// Add this after your routes but before error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Add this after setting up all routes but before the 404 handler
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log("Route registered:", r.route.path)
    }
});

const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // console.log('\nAvailable routes:');
    // console.log('- GET  /test');
    // console.log('- GET  /api/test');
    // console.log('- POST /api/auth/login');
    // console.log('- POST /api/auth/signup');
    // console.log('- GET  /api/auth/verify');
});

module.exports = { app, server };

