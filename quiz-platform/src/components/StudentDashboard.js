import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const maxScore = 50;

  // Fetch quizzes
  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare la încărcarea quiz-urilor');
        }
        return response.json();
      })
      .then((data) => setQuizzes(data))
      .catch((error) => {
        console.error(error);
        setError('Nu s-au putut încărca quiz-urile.');
      });
  }, []);

  // Fetch scores for current user
  useEffect(() => {
    const username = localStorage.getItem('username'); 

    if (!username) {
      console.error('Username-ul lipsește din localStorage!');
      setError('Utilizatorul nu este autentificat.');
      return;
    }

    fetch(`http://localhost:5000/api/scores/user/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare la încărcarea scorurilor');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Scoruri preluate:', data);
        setScores(data);
      })
      .catch((error) => {
        console.error('Eroare la preluarea scorurilor:', error);
        setError('Nu s-au putut încărca scorurile.');
      });
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar">
        <a href="/">Disconnect</a>
        <a href="#results-section">Rezultate</a>
      </div>
  
      {/* Main Content */}
      <div className="container">
        <h1 className="dashboard-title">Platforma de Quiz-uri Educaționale</h1>
  
        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}
  
        {/* Quiz List */}
        <div className="quizzes-container">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div className="quiz-card" key={quiz._id}>
                <h2 className="quiz-title">{quiz.title}</h2>
                <p className="quiz-description">{quiz.description}</p>
                <button
                  className="quiz-button"
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                >
                  Rezolvă Quiz-ul
                </button>
              </div>
            ))
          ) : (
            <p className="no-quizzes">Nu există quiz-uri disponibile momentan.</p>
          )}
        </div>
  
        {/* Results Section */}
        <div id="results-section" className="results-table">
          <h2>Rezultate</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nume Quiz</th>
                <th>Scor</th>
              </tr>
            </thead>
            <tbody>
              {scores.length > 0 ? (
                scores.map((score, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.quizTitle}</td>
                    <td>{score.points}/{maxScore}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nu există scoruri disponibile momentan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Footer */}
      <div className="footer">
        &copy; 2025 Platforma de Quiz-uri Educaționale. Toate drepturile rezervate.
      </div>
    </div>
  );
}

export default StudentDashboard;
