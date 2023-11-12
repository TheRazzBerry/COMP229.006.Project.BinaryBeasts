// Define Dependencies
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser'); // Add body-parser

// Define Express Application
const app = express();

// Define Routers
const indexRouter = require('../app/routes/index.js'); // Adjust the path accordingly
const authRoutes = require('../app/routes/authRoutes.js');
const userRoutes = require('../app/routes/userRoutes.js');
const tournamentRouter = require('../app/routes/tournaments.js'); // Assuming you have a tournament router

// Define Middleware Routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Use body-parser middleware for JSON parsing

// Define Page Routes
app.use('/', indexRouter);

// Use authentication routes
app.use('/auth', authRoutes);

// Use user routes
app.use('/user', userRoutes);

// Use tournament routes
app.use('/tournaments', tournamentRouter);

// Catch Error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((error, req, res, next) => {
  console.error(error);
  // Send Error Response
  res.status(error.status || 500);
  res.json({ success: false, message: error.message });
});

// Export Module
module.exports = app;
