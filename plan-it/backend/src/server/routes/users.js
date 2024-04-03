const express = require('express');
const router = express.Router();
const { findUser, addUser, updateUser, deleteUser } = require('../../database');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ Email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log('User found:', user);
        res.json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await findUser({ Email: email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      Firstname: firstName,
      Lastname: lastName,
      Groups: [],
      Trips: [],
      Email: email,
      password: hashedPassword,
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

router.get('/get-user/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    console.log("reached here ", userId);
    const objectUserID = new ObjectId(userId);
    const query = { _id: objectUserID };
    console.log("reached here ", query);

    const user = await findUser(query);
    res.json(user);
  } catch(error) {
      console.log("Fetching user failed: ", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/update', async (req, res) => {
  try {
    const { userId, oldEmail, newEmail, oldPassword, newPassword } = req.body;
    const objectUserID = new ObjectId(userId);
    query = { _id: objectUserID };
    if (newEmail === '' && newPassword === '') {
      return res.status(400).json({ error: 'Fields are required' });
    }
    const foundUser = await findUser({ _id: objectUserID})
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(oldEmail, foundUser.Email, oldPassword, foundUser.password)
    const passwordMatch = await bcrypt.compare(oldPassword, foundUser.password);
    if (newEmail === '' && passwordMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await updateUser({ _id: objectUserID }, { password: hashedPassword });
      res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
    } else if (newPassword === '' && foundUser.Email === oldEmail) {
      const updatedUser = await updateUser({ _id: objectUserID }, { Email: newEmail });
      res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
    } else {
      console.log('Invalid credentials');
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-user/:userId', async (req, res) => {
  try {
      const {userId} = req.params;
      const objectTripID = new ObjectId(String(userId));
      const query = { _id: objectTripID };

      const trips = await findUser(query);
      res.json(trips);
  } catch(error) {
      console.log("Fetching user failed: ", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Other routes (GET, POST, etc.) for user management

module.exports = router;
