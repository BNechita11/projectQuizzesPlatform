import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import './QuizList.css';

function QuizList() {
  const { quizzes } = useContext(QuizContext); // Preluăm quiz-urile din context

  return (
    <div className="container mt-5">
      <h1>Quiz-uri Disponibile</h1>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => console.log(`Start quiz: ${quiz._id}`)}
            >
              Rezolvă Quiz-ul
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
