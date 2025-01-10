const mongoose = require('mongoose');

const testResultsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    category: { type: String, required: true },
    marks: { type: Number, required: true },
    dateSubmitted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestResults', testResultsSchema);