import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Handle Login Submission
    const handleLogin = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Eroare la autentificare.');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('username', data.username);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);

                // Redirect based on role
                if (data.role === 'profesor') {
                    navigate('/professor-dashboard'); 
                } else if (data.role === 'student') {
                    navigate('/dashboard'); // Dashboard for students
                } else {
                    setError('Rol necunoscut. Contactați administratorul.');
                }
            })
            .catch((error) => {
                console.error(error);
                setError('Numele de utilizator sau parola sunt incorecte.');
            });
    };

    // Handle Registration Submission
    const handleRegister = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Eroare la înregistrare.');
                }
                return response.json();
            })
            .then(() => {
                setSuccess('Cont creat cu succes! Mergi la login.');
                setError(null);
                // Reset form fields
                setUsername('');
                setPassword('');
                setTimeout(() => setIsLoginMode(true), 2000); //switch to Login
            })
            .catch((error) => {
                console.error(error);
                setError('Eroare: contul nu a putut fi creat.');
                setSuccess(null);
            });
    };

    return (
        <div className="login-container">
            <h1>{isLoginMode ? 'Login' : 'Register'}</h1>
            <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
                <label htmlFor="username">Nume de utilizator:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Parolă:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {!isLoginMode && (
                    <>
                        <label htmlFor="role">Rol:</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="profesor">Profesor</option>
                        </select>
                    </>
                )}
                <button type="submit">{isLoginMode ? 'Autentificare' : 'Creează cont'}</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            <p>
                {isLoginMode
                    ? 'Nu ai un cont? '
                    : 'Ai deja un cont? '}
                <span
                    style={{ color: '#FF7043', cursor: 'pointer' }}
                    onClick={() => {
                        setIsLoginMode(!isLoginMode);
                        setError(null);
                        setSuccess(null);
                    }}
                >
                    {isLoginMode ? 'Înregistrează-te aici!' : 'Loghează-te aici!'}
                </span>
            </p>
        </div>
    );
}

export default Login;

//Login+Register