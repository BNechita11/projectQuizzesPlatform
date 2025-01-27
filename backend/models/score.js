const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    quizTitle: { type: String, required: true },
    points: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Score', ScoreSchema);
