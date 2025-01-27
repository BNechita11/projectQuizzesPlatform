const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const Score = require('../models/score'); 

// Endpoint pentru salvarea unui scor
router.post('/', async (req, res) => {
    try {
        console.log('Body primit:', req.body);

        const { username, quizId, quizTitle, points, timeTaken } = req.body;

        if (!username || !quizId || !quizTitle || points === undefined || timeTaken === undefined) {
            console.error('Date lipsă:', req.body); 
            return res.status(400).json({ message: 'Date lipsă în cerere.' });
        }

        const newScore = new Score({ username, quizId, quizTitle, points, timeTaken });
        const savedScore = await newScore.save();

        console.log('Scor salvat:', savedScore);
        res.status(201).json(savedScore);
    } catch (error) {
        console.error('Eroare la salvarea scorului:', error);
        res.status(500).json({ message: 'Eroare la salvarea scorului.' });
    }
});

// Endpoint pentru preluarea scorurilor unui utilizator
router.get('/user/:username', async (req, res) => {
    try {
        const scores = await Score.find({ username: req.params.username }).select('quizTitle points timeTaken');
        res.json(scores);
    } catch (error) {
        console.error('Eroare la preluarea scorurilor:', error);
        res.status(500).json({ message: 'Eroare la preluarea scorurilor.' });
    }
});
// Endpoint pentru preluarea tuturor scorurilor
router.get('/', async (req, res) => {
    try {
        const scores = await Score.find().select('username quizTitle points timeTaken'); 
        res.json(scores);
    } catch (error) {
        console.error('Eroare la preluarea tuturor scorurilor:', error);
        res.status(500).json({ message: 'Eroare la preluarea tuturor scorurilor.' });
    }
});

module.exports = router;
