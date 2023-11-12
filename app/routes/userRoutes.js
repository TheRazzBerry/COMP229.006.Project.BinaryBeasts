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

module.exports = router;
