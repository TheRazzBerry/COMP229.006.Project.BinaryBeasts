// Define Dependencies
const express = require('express');

//Define Router
const router = express.Router();

// Define Routes
router.get('/', (req, res, next) => { res.json({"message" : "Welcome to the DressStore Application"}) });

// Export Module
module.exports = router;