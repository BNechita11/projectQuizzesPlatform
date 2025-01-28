// const request = require('supertest');
// const app = require('../app'); // Importa aplicația ta principală Express
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const Quiz = require('../models/quiz');
// const Score = require('../models/score');

// const TEST_DB_URI = 'mongodb://127.0.0.1:27017/quiz-platformdb';

// beforeAll(async () => {
//   await mongoose.connect(TEST_DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close(); // Nu ștergem baza de date după teste
// });

// describe('Integration Tests', () => {
//   let token;

//   it('should register a user and log in', async () => {
//     // Înregistrare
//     const registerResponse = await request(app)
//       .post('/api/auth/register')
//       .send({ username: 'testuser', password: 'password123', role: 'student' });

//     expect(registerResponse.status).toBe(201);
//     expect(registerResponse.body.message).toBe('Utilizator creat cu succes!');

//     // Autentificare
//     const loginResponse = await request(app)
//       .post('/api/auth/login')
//       .send({ username: 'testuser', password: 'password123' });

//     expect(loginResponse.status).toBe(200);
//     expect(loginResponse.body.token).toBeDefined();

//     token = loginResponse.body.token; // Salvează tokenul pentru teste ulterioare
//   });

//   it('should create a quiz and save a score', async () => {
//     // Creare quiz
//     const quizData = {
//       title: 'Test Quiz',
//       questions: [
//         {
//           question: 'Care este capitala României?',
//           options: ['București', 'Cluj', 'Iași'],
//           correctAnswer: 'București',
//         },
//       ],
//     };

//     const quizResponse = await request(app)
//       .post('/api/quizzes')
//       .set('Authorization', `Bearer ${token}`)
//       .send(quizData);

//     expect(quizResponse.status).toBe(201);
//     expect(quizResponse.body.title).toBe('Test Quiz');

//     const quizId = quizResponse.body._id; // Obține ID-ul quiz-ului creat

//     // Salvare scor
//     const scoreData = {
//       username: 'testuser',
//       quizId: quizId,
//       quizTitle: 'Test Quiz',
//       points: 10,
//       timeTaken: 120,
//     };

//     const scoreResponse = await request(app)
//       .post('/api/scores')
//       .set('Authorization', `Bearer ${token}`)
//       .send(scoreData);

//     expect(scoreResponse.status).toBe(201);
//     expect(scoreResponse.body.points).toBe(10);
//     expect(scoreResponse.body.timeTaken).toBe(120);
//   });
// });
