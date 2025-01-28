import { test, expect } from '@playwright/test';

test('Performance Test - GET /api/quizzes', async ({ request }) => {
  const start = Date.now();
  
  const response = await request.get('http://localhost:5000/api/quizzes');
  
  const duration = Date.now() - start;  
  
  console.log(`Timp de răspuns pentru GET /api/quizzes: ${duration}ms`);
  
  expect(response.status()).toBe(200);

  expect(duration).toBeLessThan(500);
});

//pt testare :  npx playwright test tests/performance/quizPerformance.test.js