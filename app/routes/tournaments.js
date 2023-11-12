// Define Module Dependencies
const express = require('express');

// Define Router
const router = express.Router();

// Define Model Dependencies
const Tournament = require('../models/tournamentModel');

// Define Controllers
let tournamentController = require('../controllers/tournamentController');
let authController = require('../controllers/authController');

// Define Method Routes
router.get('/', (req, res, next) => { res.json({ "message" : "tournaments.js root directory" }); });
router.get('/list', tournamentController.list);
router.get('/:id', tournamentController.find, tournamentController.read);
router.post('/', tournamentController.add);

router.put('/edit/:id', 
    authController.requireSignin,
    authController.isAllowed,
    tournamentController.update);
router.delete('/:id', tournamentController.delete);

// Export Module
module.exports = router;