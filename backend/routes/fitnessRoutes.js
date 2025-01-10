const express = require('express');
const router = express.Router();
const { saveFitnessScore, getFitnessScores, getUserAllScores } = require('../controllers/fitnessController');
const authenticateToken = require('../middleware/auth');

// Protected routes - require authentication
router.post('/save-score', authenticateToken, saveFitnessScore);
router.get('/scores/:userId', authenticateToken, getFitnessScores);
router.get('/user-scores/:userId', authenticateToken, getUserAllScores);

module.exports = router;