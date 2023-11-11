// Define Module Dependencies
const mongoose = require('mongoose');

// Create Schema
const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    hashedPass: { type: String, required: true }
});

// Define Model
const user = mongoose.model('User', userSchema);

// Export Model
module.exports = user;