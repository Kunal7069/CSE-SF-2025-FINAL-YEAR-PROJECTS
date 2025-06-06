const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./voters.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    aadhar TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);
});

module.exports = db;
