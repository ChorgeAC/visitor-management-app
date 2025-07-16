const bcrypt = require('bcryptjs');
const db = require('../models/db');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.execute(sql, [name, email, hash, role], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: 'User registered' });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.execute('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (err || results.length === 0) return res.status(400).json({ message: 'Invalid email' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
};

module.exports = {
    registerUser,
    loginUser
}