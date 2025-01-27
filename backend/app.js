const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizzes');
const scoreRoutes = require('./routes/scores');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/scores', scoreRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiz-platformdb';
const PORT = process.env.PORT || 5000;

// Conexiune la baza de date MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true }) 
  .then(() => console.log('✅ Conectat la MongoDB!'))
  .catch((err) => {
    console.error('❌ Eroare la conectarea cu MongoDB:', err);
    process.exit(1);
  });


// Gestionare rută neexistentă
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta solicitată nu există!' });
});

// Gestionare erori globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'A apărut o eroare internă!' });
});

// Pornire server
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server pornit pe portul ${PORT}`);
  });
});
