const express = require('express');
const router = express.Router();
const { createUser, findUserByEmail } = require('../models/userModel');

// Register
router.post('/register', (req, res) => {
  const user = req.body;

  createUser(user, (err, id) => {
    if (err) {
      console.error(err.message);
      return res.json({ success: false, message: "Email or Aadhar already used." });
    }
    res.json({ success: true, userId: id });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({ success: true, user });
  });
});

module.exports = router;
