// routes/userRoutes.js

const express = require('express');
const userModel = require('../models/userModel');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Get current user profile
router.get('/profile', authenticate, (req, res) => {
  res.send(req.user);
});

// Update user profile
router.patch('/profile', authenticate, async (req, res) => {
  const allowedUpdates = ['userName', 'email', 'password'];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all users
router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user by ID
router.patch('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const allowedUpdates = ['userName', 'email', 'password'];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by ID
router.delete('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: `User with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... (more routes if needed)

module.exports = router;
