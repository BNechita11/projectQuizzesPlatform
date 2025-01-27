import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuizDetails.css';

const QuizDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [answers, setAnswers] = useState({});
    const [completed, setCompleted] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        // Fetch detalii quiz
        fetch(`http://localhost:5000/api/quizzes/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Eroare la încărcarea detaliilor quiz-ului');
                }
                return response.json();
            })
            .then((data) => {
                setQuiz(data);
                setStartTime(Date.now());
            })
            .catch((error) => {
                console.error(error);
                setError('Nu s-au putut încărca detaliile quiz-ului.');
            });
    }, [id]);

    const handleAnswerSelect = (questionIndex, option) => {
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: option,
        }));
    };

    const handleSubmit = () => {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000); 
        let score = 0;

        const resultDetails = quiz.questions.map((question, index) => {
            const userAnswer = answers[index] || 'Niciun răspuns';
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) {
                score += 10;
            }
            return {
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
            };
        });

        fetch('http://localhost:5000/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: localStorage.getItem('username'), 
                quizId: quiz._id,
                quizTitle: quiz.title,
                points: score,
                timeTaken: timeTaken,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Eroare la salvarea scorului');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Scor salvat cu succes:', data);
                setResults({
                    score: score,
                    timeTaken: timeTaken,
                    details: resultDetails,
                });
                setCompleted(true);
            })
            .catch((error) => console.error('Eroare la salvarea scorului:', error));
    };

    if (error) {
        return (
            <div className="error-message">
                {error}
                <button onClick={() => navigate('/')}>Înapoi la Home</button>
            </div>
        );
    }

    if (!quiz) {
        return <p>Se încarcă detaliile quiz-ului...</p>;
    }

    if (completed && results) {
        return (
            <div className="quiz-results">
                <h1>Rezultatele Quiz-ului</h1>
                <p>Scorul tău: {results.score} puncte</p>
                <p>Timpul total: {results.timeTaken} secunde</p>
                <h2>Detalii Răspunsuri</h2>
                <ul>
                    {results.details.map((result, index) => (
                        <li key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                            <h3>Întrebarea {index + 1}: {result.question}</h3>
                            <p>Răspunsul tău: {result.userAnswer}</p>
                            <p>Răspunsul corect: {result.correctAnswer}</p>
                        </li>
                    ))}
                </ul>
               <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Înapoi la StudentDashboard</button>
            </div>
        );
    }

    return (
        <div className="quiz-details">
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>

            <div className="questions">
                {quiz.questions.map((question, index) => (
                    <div key={index} className="question-card">
                        <h2>
                            Întrebarea {index + 1}: {question.question}
                        </h2>
                        <ul>
                            {question.options.map((option, idx) => (
                                <li key={idx}>
                                    <button
                                        className={`option-btn ${answers[index] === option ? 'selected' : ''}`}
                                        onClick={() => handleAnswerSelect(index, option)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <button className="btn btn-secondary" onClick={handleSubmit}>Trimite Quiz-ul</button>
        </div>
    );
};

export default QuizDetails;
