import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddQuiz.css';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(
    Array(5).fill({
      question: '',
      correctAnswer: '',
      wrongAnswers: ['', '', ''],
    })
  );

  const handleInputChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const updatedQuestion = { ...updatedQuestions[index] }; 
      if (field === 'question') {
        updatedQuestion.question = value;
      } else if (field === 'correctAnswer') {
        updatedQuestion.correctAnswer = value;
      } else if (field.startsWith('wrongAnswer')) {
        const wrongIndex = parseInt(field.split('-')[1]);
        const updatedWrongAnswers = [...updatedQuestion.wrongAnswers];
        updatedWrongAnswers[wrongIndex] = value;
        updatedQuestion.wrongAnswers = updatedWrongAnswers;
      }
      updatedQuestions[index] = updatedQuestion;
      return updatedQuestions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedQuestions = questions.map((q) => {
      const options = [q.correctAnswer, ...q.wrongAnswers].sort(() => Math.random() - 0.5);

      return {
        question: q.question,
        options,
        correctAnswer: q.correctAnswer, 
      };
    });

    const newQuiz = {
      title,
      questions: formattedQuestions,
    };

    console.log('Submitting quiz:', newQuiz); 

    fetch('http://localhost:5000/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuiz),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            console.error('Error response:', data);
            throw new Error(data.message || 'Unknown error occurred');
          });
        }
        return response.json();
      })
      .then((data) => {
        alert('Quiz creat cu succes!');
        console.log('Quiz creat:', data);
        setTitle('');
        setQuestions(
          Array(5).fill({
            question: '',
            correctAnswer: '',
            wrongAnswers: ['', '', ''],
          })
        );
      })
      .catch((error) => {
        console.error('Eroare la crearea quiz-ului:', error);
        alert(`A apărut o eroare: ${error.message}`);
      });
  };

  return (
    <div className="add-quiz-container">
      <h1>Creează un Quiz Nou</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titlu:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Introdu titlul quiz-ului"
          required
        />

        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <h2>Întrebarea {index + 1}</h2>
            <label htmlFor={`question-${index}`}>Textul întrebării:</label>
            <input
              type="text"
              id={`question-${index}`}
              value={q.question}
              onChange={(e) => handleInputChange(index, 'question', e.target.value)}
              placeholder={`Introdu întrebarea ${index + 1}`}
              required
            />

            <label htmlFor={`correctAnswer-${index}`}>Răspuns Corect:</label>
            <input
              type="text"
              id={`correctAnswer-${index}`}
              value={q.correctAnswer}
              onChange={(e) => handleInputChange(index, 'correctAnswer', e.target.value)}
              placeholder="Introdu răspunsul corect"
              required
            />

            <label>Răspunsuri Greșite:</label>
            {q.wrongAnswers.map((ans, i) => (
              <input
                key={i}
                type="text"
                id={`wrongAnswer-${index}-${i}`}
                value={ans}
                onChange={(e) => handleInputChange(index, `wrongAnswer-${i}`, e.target.value)}
                placeholder={`Răspuns Greșit ${i + 1}`}
                required
              />
            ))}
          </div>
        ))}

        <button type="submit">Creează Quiz</button>
        <button className="btn btn-secondary" onClick={() => navigate('/professor-dashboard')}>Înapoi la ProfessorDashboard</button>
      </form>
    </div>
  );
};

export default AddQuiz;
