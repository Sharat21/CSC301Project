const express = require('express');
const router = express.Router();
const { findUser, addUser, updateUser, deleteUser } = require('../../database');

// Login route
router.post('/login', async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await findUser({ Email: email, password: password });

    if (user) {
      console.log('User found:', user);
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log("it didn't work");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check for empty fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user with the same email already exists
    const existingUser = await findUser({ Email: email, password: password });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = {
      Firstname: firstName,
      Lastname: lastName,
      Groups: [],
      Trips: [],
      Email: email,
      password: password,
    };

    const result = await addUser(newUser);
    
    res.json({
      success: true,
      message: 'User added successfully',
      user: result,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other routes (GET, POST, etc.) for user management

module.exports = router;
