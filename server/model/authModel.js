const db = require('../db');

const User = {
  findByEmail: async (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    try {
      const [rows] = await db.query(sql, [email]);
      console.log('findByEmail rows:', rows);
      return rows[0];
    } catch (err) {
      console.error('Error in findByEmail:', err);
      throw err;
    }
  },

  create: async (userData) => {
    const { username, email, phone, year_of_study, hashed_password } = userData;
    const sql =
      'INSERT INTO user (name, email, phone, year_of_study, hashed_password) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await db.query(sql, [
        username,
        email,
        phone,
        year_of_study,
        hashed_password,
      ]);
      console.log('create user result:', result);
      return result;
    } catch (err) {
      console.error('Error in create user:', err);
      throw err;
    }
  },
};

module.exports = User;