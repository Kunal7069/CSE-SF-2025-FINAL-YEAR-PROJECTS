const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Voter registration
app.post('/api/register', (req, res) => {
  const { aadhar, password } = req.body;

  db.run(`INSERT INTO voters (aadhar, password) VALUES (?, ?)`, [aadhar, password], function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ success: false, message: 'Voter already exists' });
      }
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.status(201).json({ success: true, message: 'Voter registered' });
  });
});

// Voter login
app.post('/api/login', (req, res) => {
  const { aadhar, password } = req.body;

  db.get(`SELECT * FROM voters WHERE aadhar = ? AND password = ?`, [aadhar, password], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (row) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
