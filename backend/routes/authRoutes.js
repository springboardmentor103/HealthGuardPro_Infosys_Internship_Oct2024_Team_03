const express = require('express');
const router = express.Router();
const { login, signup, verifyToken, forgotPassword } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// Debug middleware
router.use((req, res, next) => {
    console.log('Auth route accessed:', {
        method: req.method,
        path: req.path,
        fullPath: req.originalUrl,
        body: req.body
    });
    next();
});

// Auth routes
router.post('/login', login);
router.post('/signup', signup);
router.get('/verify', authenticateToken, verifyToken);
router.post('/forgot-password', forgotPassword);

// Test route
router.get('/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Auth routes are working' 
    });
});

module.exports = router;