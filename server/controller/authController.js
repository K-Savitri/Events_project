const db = require('../db')
require('dotenv').config();

// const auth =  (req, res)=>{
//     res.json('all users fetched')
// }


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/authModel');

const auth = (req, res) => {
  res.json('Auth route accessed');
};

const register = async (req, res) => {
  const { username, email, phone, year_of_study, password } = req.body;

  try {
    // Checking if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the  password
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password, salt);

    // Create a user
    await User.create({
      username,
      email,
      phone,
      year_of_study,
      hashed_password,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding user
    const user = await User.findByEmail(email);
    console.log('login user:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //  password match ??
    const isMatch = bcrypt.compareSync(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generating JWT
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );


    console.log('JWT_SECRET from authcontrollerrr:', process.env.JWT_SECRET);

    res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// const getUserData 






module.exports = { auth, register, login };




// module.exports = {
//     auth, register
// }