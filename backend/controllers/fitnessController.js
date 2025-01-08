const User = require('../models/User');
const FitnessScore = require('../models/FitnessScore');
const TestResult = require('../models/TestResults');

// Save fitness score
const saveFitnessScore = async (req, res) => {
    try {
        console.log('Received save score request:', req.body);
        const { userId, category, score } = req.body;
        
        // Validate inputs
        if (!userId || !category || score === undefined) {
            console.log('Missing required fields:', { userId, category, score });
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                received: { userId, category, score }
            });
        }

        // Validate score range
        if (score < 0 || score > 100) {
            return res.status(400).json({
                success: false,
                message: "Score must be between 0 and 100"
            });
        }

        // Validate category
        const validCategories = ['Physical Fitness', 'Nutrition', 'Lifestyle', 'Mental Well-being', 'Bio-markers'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Create new score
        const newScore = new FitnessScore({
            userId,
            category,
            score,
            timestamp: new Date()
        });

        console.log('Saving new score:', newScore);

        // Save to database
        await newScore.save();
        console.log('Score saved successfully');

        // Calculate and update overall score
        const allUserScores = await FitnessScore.aggregate([
            { $match: { userId } },
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: '$category',
                    latestScore: { $first: '$score' }
                }
            }
        ]);

        const validScores = allUserScores.filter(score => score.latestScore > 0);
        const overallScore = validScores.length > 0
            ? Math.round(validScores.reduce((sum, score) => sum + score.latestScore, 0) / validScores.length)
            : 0;

        // Save to TestResults
        const testResult = new TestResult({
            userId: user._id,
            username: user.username,
            category,
            score,
            overallScore
        });

        await testResult.save();

        // Update user's overall score
        await User.findByIdAndUpdate(userId, { 
            overallScore,
            lastScoreUpdate: new Date()
        });

        // Send response
        res.status(201).json({
            success: true,
            message: "Score saved successfully",
            data: {
                testResult,
                overallScore
            }
        });
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Check for specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Score already exists for this category"
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        res.status(500).json({
            success: false,
            message: "Error saving fitness score",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Get fitness scores
const getFitnessScores = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const scores = await FitnessScore.find({ userId })
            .sort({ timestamp: -1 });
        
        res.json({
            success: true,
            data: scores
        });
    } catch (error) {
        console.error('Error fetching fitness scores:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scores'
        });
    }
};

// Get user all scores
const getUserAllScores = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Get the latest score for each category
        const scores = await FitnessScore.aggregate([
            { $match: { userId: userId } },
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: '$category',
                    latestScore: { $first: '$score' },
                    timestamp: { $first: '$timestamp' }
                }
            }
        ]);

        // Calculate overall score
        const validScores = scores.filter(score => score.latestScore > 0);
        const overallScore = validScores.length > 0
            ? Math.round(validScores.reduce((sum, score) => sum + score.latestScore, 0) / validScores.length)
            : 0;

        res.json({
            success: true,
            data: {
                categoryScores: scores,
                overallScore: overallScore
            }
        });
    } catch (error) {
        console.error('Error fetching user scores:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user scores'
        });
    }
};

// Add a new function to get test results
const getTestResults = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await TestResult.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error('Error fetching test results:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch test results'
        });
    }
};

// Export all functions
module.exports = {
    saveFitnessScore,
    getFitnessScores,
    getUserAllScores,
    getTestResults
}; 