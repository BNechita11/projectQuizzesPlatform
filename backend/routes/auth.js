const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = 'secretulMeuSuperSecurizat';

// Înregistrare (Register)
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Te rog furnizează un username, o parolă și un rol.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilizatorul există deja.' });
    }

    const user = new User({ username, password, role });
    await user.save();

    return res.status(201).json({ message: 'Utilizator creat cu succes!' });
  } catch (error) {
    console.error('Eroare la /register:', error);
    return res.status(500).json({ message: 'A apărut o eroare la înregistrare.', error });
  }
});

// Login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Te rog furnizează username și parola.' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Utilizator inexistent.' });
      }

      const isMatch = password === user.password; 
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Parolă incorectă.' });
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({
        message: 'Autentificare reușită.',
        token,
        username: user.username,
        role: user.role
      });
    } catch (error) {
      console.error('Eroare la /login:', error);
      res.status(500).json({ message: 'A apărut o eroare la autentificare.', error });
    }
  });
  

// Endpoint pentru actualizarea parolelor (doar pentru testare)
router.post('/update-passwords', async (req, res) => {
  try {
    const users = await User.find();

    for (const user of users) {
      if (!user.password.startsWith('$2b$')) { 
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
      }
    }

    res.status(200).json({ message: 'Parolele au fost criptate cu succes!' });
  } catch (error) {
    console.error('Eroare la actualizarea parolelor:', error);
    res.status(500).json({ message: 'A apărut o eroare la actualizarea parolelor.', error });
  }
});

module.exports = router;
