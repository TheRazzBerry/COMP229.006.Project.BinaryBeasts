// models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid e-mail address'],
  },
  hashedPass: {
    type: String,
    required: 'Password is required',
  },
  salt: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual('password').set(function (password) {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  } else {
    this.salt = bcrypt.genSaltSync(10);
    this.hashedPass = bcrypt.hashSync(password, this.salt);
  }
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.hashedPass);

  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.hashedPass;
  delete userObject.salt;
  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
