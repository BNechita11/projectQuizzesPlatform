import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quizzes'; 

export const getQuizzes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Eroare la obținerea quiz-urilor:', error);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(API_URL, quizData);
    return response.data;
  } catch (error) {
    console.error('Eroare la crearea quiz-ului:', error);
    throw error;
  }
};

export const getQuizById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Eroare la obținerea quiz-ului cu id-ul ${id}:`, error);
    throw error;
  }
};
