import React from 'react';

function Results({ scores }) {
    return (
        <div className="results-table">
            <h4>Rezultate</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nume Elev</th>
                        <th>Scor</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.quizTitle}</td>
                            <td>{score.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Results;
