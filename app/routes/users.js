// Define Module Dependencies
const express = require('express');

// Define Router
const router = express.Router();

// Define Model Dependencies
const User = require('../models/userModel');

// Define Controllers
let userController = require('../controllers/userController');

// Define Method Routes
router.get('/', (req, res, next) => { res.json({ "message" : "users.js root directory" }); });
router.get('/list', userController.list);
router.get('/:id', userController.find, userController.read);
router.post('/', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

// Export Module
module.exports = router;