const mongoose = require('mongoose');

//Schema intrebari
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true }, 
  options: {
    type: [String], 
    validate: [arrayLimit, 'A question must have at least two options'], 
    required: true,
  },
  correctAnswer: { 
    type: String, 
    required: true,
  },
});

// Funcție pentru validarea numărului minim de opțiuni
function arrayLimit(val) {
  return val.length >= 2; 
}

// Schemă pentru quiz-uri
const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    questions: {
      type: [QuestionSchema], 
      required: true,
    },
  },
  { timestamps: true }
);

// Crearea modelului
const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
