// Define Module Dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');

// Create Schema
const userSchema = mongoose.Schema({
    userName: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+\@.+\..+/, 'Invalid email!'] },
    hashedPass: { type: String, required: true },
    salt: { type: String },
    created: { type: Date, default: Date.now, immutable: true },
    updated: { type: Date, default: Date.now }
}, { collection: 'users' });

// Set 'hashedPass' Using Password Input
userSchema.virtual('password').set(function (password) {
    if (password.length < 8) { throw new Error('Password must be at least 8 characters.'); }
    else {
        this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.hashedPass = this.hashPassword(password);
    }
});

// Return A Hashed Password Using Password Input
userSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

// Compare Stored 'hashedPass' To Hashed Password Input
userSchema.methods.authenticate = function (password) {
    return this.hashedPass === this.hashPassword(password);
}

// Ensure Virtual Fields Are Serialized
userSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) { 
        delete ret._id;
        delete ret.hashedPass;
        delete ret.salt;
    }
});

// Define Model
const user = mongoose.model('User', userSchema);

// Export Model
module.exports = user;