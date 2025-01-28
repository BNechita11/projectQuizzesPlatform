import { test, expect } from '@playwright/test';

test('Performance Test - GET /api/quizzes', async ({ request }) => {
  // Măsurăm timpul de răspuns
  const start = Date.now();
  
  // Trimitem cererea GET către /api/quizzes
  const response = await request.get('http://localhost:5000/api/quizzes');
  
  const duration = Date.now() - start;  // Măsurăm timpul de răspuns
  
  console.log(`Timp de răspuns pentru GET /api/quizzes: ${duration}ms`);
  
  // Verificăm că răspunsul are statusul 200
  expect(response.status()).toBe(200);

  // Verificăm că timpul de răspuns este sub 500ms
  expect(duration).toBeLessThan(500);
});

//pt testare :  npx playwright test tests/performance/quizPerformance.test.js