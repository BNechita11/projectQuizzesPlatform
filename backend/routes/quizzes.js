const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const { body, validationResult } = require('express-validator');

// Gasire quiz dupa ID
async function getQuiz(req, res, next) {
  let quiz;
  try {
    quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.quiz = quiz;
  next();
}

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new quiz
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Titlul este obligatoriu.'),
    body('questions').isArray({ min: 1 }).withMessage('Trebuie să existe cel puțin o întrebare.'),
    body('questions.*.question').notEmpty().withMessage('Fiecare întrebare trebuie să aibă un text.'),
    body('questions.*.options')
      .isArray({ min: 2 })
      .withMessage('Fiecare întrebare trebuie să aibă cel puțin două opțiuni.'),
    body('questions.*.correctAnswer').notEmpty().withMessage('Răspunsul corect este obligatoriu.'),
  ],
  async (req, res) => {
    console.log('Received payload:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, questions } = req.body;

    try {
      const quiz = new Quiz({ title, questions });
      const newQuiz = await quiz.save();
      res.status(201).json(newQuiz);
    } catch (error) {
      console.error('Error saving quiz:', error);
      res.status(500).json({ message: 'A apărut o eroare la crearea quiz-ului.' });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz-ul nu a fost găsit.' });
    }

    res.status(200).json({ message: 'Quiz-ul a fost șters cu succes.' });
  } catch (error) {
    console.error('Eroare la ștergerea quiz-ului:', error);
    res.status(500).json({ message: 'A apărut o eroare la ștergerea quiz-ului.' });
  }
});

router.get('/:id', getQuiz, (req, res) => {
  res.json(res.quiz);
});

module.exports = router;
