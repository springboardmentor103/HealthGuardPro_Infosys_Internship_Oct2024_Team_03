const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, userController.getUser);
router.get('/leaderboard', authenticateToken, userController.getLeaderboard);
router.put('/update', authenticateToken, userController.updateUser);

module.exports = router; 