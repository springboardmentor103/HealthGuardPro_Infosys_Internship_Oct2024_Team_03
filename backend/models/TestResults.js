const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Physical Fitness', 'Nutrition', 'Lifestyle', 'Mental Well-being', 'Bio-markers']
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    overallScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

// Index for faster queries
testResultSchema.index({ userId: 1, category: 1, createdAt: -1 });

module.exports = mongoose.model('TestResult', testResultSchema);

/* const mongoose = require('mongoose');

const testResultsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    category: { type: String, required: true },
    marks: { type: Number, required: true },
    dateSubmitted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResults', testResultsSchema); */