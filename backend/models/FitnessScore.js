const mongoose = require('mongoose');

const fitnessScoreSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Physical Fitness', 'Nutrition', 'Lifestyle', 'Mental Well-being', 'Bio-markers'],
            message: '{VALUE} is not a valid category'
        }
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        min: [0, 'Score cannot be less than 0'],
        max: [100, 'Score cannot be more than 100']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Remove the unique index and add a normal index for performance
fitnessScoreSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('FitnessScore', fitnessScoreSchema);