const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
    try {
        const email = req.user.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email }, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRank = await User.countDocuments({
            overallScore: { $gt: user.overallScore }
        }) + 1;

        // Get total number of users for rank calculation
        const totalUsers = await User.countDocuments();

        // Format response data
        const userData = {
            username: user.username,
            email: user.email,
            rank: userRank,
            totalUsers,
            points: user.overallScore,
        };

        res.json(userData);
    } catch (error) {
        console.log(error);
        
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { firstName, email } = req.body;
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (firstName) user.firstName = firstName;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};


exports.getLeaderboard = async (req, res) => {
    try {
        // Fetch users and sort by overallScore in descending order
        const users = await User.find(
            {},
            { username: 1, overallScore: 1, _id: 0 }
        ).sort({ overallScore: -1 });

        if (!users) {
            return res.status(404).json({
                status: 'error',
                message: 'No users found'
            });
        }

        // Add rankings to the sorted users
        
        
        const leaderboardData = users.map((user, index) => ({
            username: user.username,
            ranking: index + 1,
            overallScore: user.overallScore
        }));

        // Send response
        res.status(200).json({
            status: 'success',
            data: leaderboardData
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching leaderboard data',
            error: error.message
        });
    }
};
