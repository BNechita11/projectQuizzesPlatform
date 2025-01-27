import React from 'react';

function QuizCard({ title, onClick }) {
    return (
        <div className="quiz-card">
            <h4>{title}</h4>
            <button className="btn btn-primary mt-2" onClick={onClick}>
                Rezolvă Quiz-ul
            </button>
        </div>
    );
}

export default QuizCard;
