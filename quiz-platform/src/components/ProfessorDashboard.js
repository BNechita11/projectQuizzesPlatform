import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessorDashboard.css';

function ProfessorDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quizzes
    fetch('http://localhost:5000/api/quizzes')
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error('Eroare la încărcarea quiz-urilor:', error));

    // Fetch scores
    fetch('http://localhost:5000/api/scores')
      .then((response) => response.json())
      .then((data) => {
        // Sorted scores
        const sortedScores = data.sort((a, b) => b.points - a.points);
        setScores(sortedScores);
      })
      .catch((error) => console.error('Eroare la încărcarea scorurilor:', error));
  }, []);

  const handleDeleteQuiz = (quizId) => {
    if (!window.confirm('Sigur dorești să ștergi acest quiz?')) {
      return;
    }

    fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare la ștergerea quiz-ului');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message); 
        setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId)); 
      })
      .catch((error) => {
        console.error('Eroare la ștergerea quiz-ului:', error);
        alert('A apărut o eroare la ștergerea quiz-ului.');
      });
  };

  return (
    <div className="professor-dashboard">
      <header>
        <h1>Profesor Dashboard</h1>
      </header>
      <div className="professor-navbar">
        <a href="/">Disconnect</a>
        <a href="#leaderboard-section">Ranking</a>
      </div>
      <div className="professor-dashboard-container">
        {/* Add new quiz button */}
        <button onClick={() => navigate('/add-quiz')}>Adaugă Quiz Nou</button>

        {/* Quiz List */}
        <section className="professor-quizzes-list">
          <h2>Quiz-uri Existente</h2>
          {quizzes.length > 0 ? (
            <div className="professor-quiz-grid">
              {quizzes.map((quiz) => (
                <div key={quiz._id} className="professor-quiz-item">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                  <button onClick={() => handleDeleteQuiz(quiz._id)}>
                    Șterge Quiz
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Nu există quiz-uri disponibile.</p>
          )}
        </section>

        {/* Leaderboard Section */}
        <section id="leaderboard-section" className="results-table">
          <h2>Clasamentul Elevilor</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nume Elev</th>
                <th>Nume Quiz</th>
                <th>Scor</th>
              </tr>
            </thead>
            <tbody>
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.username}</td>
                    <td>{score.quizTitle}</td>
                    <td>{score.points}/50</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nu există scoruri disponibile momentan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Image Section */}
        <section className="professor-image-section">
          <h2>Welcome, Profesor!</h2>
          <img src="/images/profesor.jpg" alt="Professor" style={{ width: '100%', borderRadius: '10px' }} />
        </section>
      </div>
    </div>
  );
}

export default ProfessorDashboard;
