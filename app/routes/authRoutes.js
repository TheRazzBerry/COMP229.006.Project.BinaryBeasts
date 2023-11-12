// routes/authRoutes.js

const express = require('express');
const userModel = require('../models/userModel');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = new userModel({ userName, email, password });
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByCredentials(email, password);

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
