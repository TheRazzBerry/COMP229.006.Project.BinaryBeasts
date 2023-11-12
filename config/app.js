// Define Dependencies
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');

// Define Express Application
const app = express();

// Define Routers
const indexRouter = require('../app/routes/index.js');
const usersRouter = require('../app/routes/users.js');
const tournamentRouter = require('../app/routes/tournaments.js');

// Define Middleware Routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Page Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
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