// import { expect } from 'chai';
// import mongoose from 'mongoose';
// import request from 'supertest';
// import User from '../../models/User.js';
// import Quiz from '../../models/quiz.js';
// import Score from '../../models/score.js';

// describe('Integration Test for Quiz and Scoring', () => {
//   let userToken, quizId;

//   before(async () => {
//     // Conectează-te la baza de date
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect('mongodb://localhost/myDatabase'); // Folosește baza principală
//     }

//     // Pornește serverul
//     startServer();

//     // Creează un utilizator de test (temporar)
//     const userResponse = await request(app)
//       .post('/api/auth/register')
//       .send({
//         username: 'test_testuser', // Prefix test pentru identificare
//         password: 'testpassword',
//         role: 'student',
//       });

//     const loginResponse = await request(app)
//       .post('/api/auth/login')
//       .send({
//         username: 'test_testuser',
//         password: 'testpassword',
//       });

//     userToken = loginResponse.body.token;

//     // Creează un quiz de test (temporar)
//     const quizResponse = await request(app)
//       .post('/api/quizzes')
//       .set('Authorization', `Bearer ${userToken}`)
//       .send({
//         title: 'Test Quiz for Integration',
//         questions: [
//           {
//             question: 'Ce este 3+3?',
//             options: ['5', '6', '7', '8'],
//             correctAnswer: '6',
//           },
//         ],
//       });

//     quizId = quizResponse.body._id;
//   });

//   it('should create a quiz and verify it exists', async () => {
//     const quiz = await Quiz.findById(quizId);
//     expect(quiz).to.exist;
//     expect(quiz.title).to.equal('Test Quiz for Integration');
//   });

//   it('should allow submitting a score', async () => {
//     const scoreResponse = await request(app)
//       .post('/api/scores')
//       .set('Authorization', `Bearer ${userToken}`)
//       .send({
//         username: 'test_testuser',
//         quizId,
//         quizTitle: 'Test Quiz for Integration',
//         points: 15,
//         timeTaken: 45,
//       });

//     expect(scoreResponse.status).to.equal(201);
//     expect(scoreResponse.body.username).to.equal('test_testuser');
//     expect(scoreResponse.body.points).to.equal(15);

//     // Verifică dacă scorul există în baza de date
//     const score = await Score.findOne({ username: 'test_testuser' });
//     expect(score).to.exist;
//     expect(score.points).to.equal(15);
//   });

//   after(async () => {
//     // Șterge doar datele temporare (utilizatori și quiz-uri create în test)
//     await User.deleteMany({ username: /^test_/ }); // Șterge doar utilizatorii de test
//     await Quiz.deleteMany({ title: /^Test Quiz/ }); // Șterge doar quiz-urile de test
//     await Score.deleteMany({ username: /^test_/ }); // Șterge doar scorurile de test
//     await mongoose.connection.close();
//   });
// });
