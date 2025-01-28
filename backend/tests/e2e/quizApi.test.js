import { test, expect } from '@playwright/test'; 

// Test pentru recuperarea unui quiz după ID
test.describe('Quiz API - GET /api/quizzes/:id', () => {
  let quizId;

  test.beforeAll(async ({ request }) => {
    const quizData = {
      title: 'Geography Quiz',
      questions: [
        {
          question: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin'],
          correctAnswer: 'Paris'
        }
      ]
    };

    const res = await request.post('http://localhost:5000/api/quizzes', {
      data: quizData
    });
    const body = await res.json();
    quizId = body._id; 
  });

  test('should retrieve the quiz by ID', async ({ request }) => {
    const res = await request.get(`http://localhost:5000/api/quizzes/${quizId}`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('_id', quizId);
    expect(body).toHaveProperty('title', 'Geography Quiz');
  });
});
//pt testare :  npx playwright test tests/e2e/quizApi.test.js