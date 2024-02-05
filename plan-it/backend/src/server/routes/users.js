const express = require('express');
const router = express.Router();
const { findUser, addUser, updateUser, deleteUser } = require('../../database');

// Define routes for Users endpoint

// Login route
router.post('/login', async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await findUser({ Email: email, password: password });

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log("it didn't work");
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other routes (GET, POST, etc.) for user management

module.exports = router;
