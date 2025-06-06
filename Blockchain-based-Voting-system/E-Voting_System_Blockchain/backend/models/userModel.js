const db = require('../database');

const createUser = (user, callback) => {
  const query = `INSERT INTO voters (firstName, lastName, aadhar, email, password)
                 VALUES (?, ?, ?, ?, ?)`;
  const params = [user.firstName, user.lastName, user.aadhar, user.email, user.password];

  db.run(query, params, function(err) {
    callback(err, this.lastID);
  });
};

const findUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM voters WHERE email = ?`, [email], (err, row) => {
    callback(err, row);
  });
};

module.exports = { createUser, findUserByEmail };
