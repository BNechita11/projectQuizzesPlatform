// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import QuizDetails from './components/QuizDetails';
import AddQuiz from './components/AddQuiz';
import QuizList from './components/QuizList';
import './App.css';

function App() {
  const [role, setRole] = useState(null); 

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  return (
    <QuizProvider> {/* Învelim aplicația în QuizProvider */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              role === "student" ? (
                <Navigate to="/dashboard" />
              ) : role === "profesor" ? (
                <Navigate to="/professor-dashboard" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/dashboard/*" element={<StudentDashboard />} />
          <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
          <Route path="/quiz/:id" element={<QuizDetails />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/quiz-list" element={<QuizList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
