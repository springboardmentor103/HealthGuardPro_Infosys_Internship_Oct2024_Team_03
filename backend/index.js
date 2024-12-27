require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');

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

// 404 handler
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

