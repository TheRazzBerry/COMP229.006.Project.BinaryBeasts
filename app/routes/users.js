// Define Module Dependencies
const express = require('express');

// Define Router
const router = express.Router();

// Define Model Dependencies
const User = require('../models/userModel');

// Define Controllers
let userController = require('../controllers/userController');
let authController = require('../controllers/authController');

// Define Method Routes
router.get('/', (req, res, next) => { res.json({ "message" : "users.js root directory" }); });
router.post('/signup', userController.add);
router.post('/signin', authController.signin);
router.get('/list', userController.list);

router.get('/get/:id',
    userController.find,
    userController.read);
router.put('/update/:id', 
    authController.requireSignin, 
    authController.hasAuth, 
    userController.update);
router.delete('/delete/:id',
    authController.requireSignin,
    authController.hasAuth,
    userController.delete);

// Export Module
module.exports = router;