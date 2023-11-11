// Define Module Dependencies
const mongoose = require('mongoose');

// Create Schema
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
      },

    email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },

    hashedPass: {
    type: String,
    required: 'Passowrd is required',
  },

  salt: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
},
  {
    collection: "user"
  }
);

userSchema.virtual('fullName')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function (fullName) {
    let splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });


  userSchema.virtual('password')
  .set(function (password) {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters.')
    }
    else {
      this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
      this.hashedPass = this.hashPassword(password);
    }
  });

  userSchema.methods.hashPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

userSchema.methods.authenticate = function (password) {
  return this.hashedPass === this.hashPassword(password);
}


// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { 
    delete ret.hashedPass;
    delete ret.salt;
  }
});

// Define Model
const user = mongoose.model('User', userSchema);

// Export Model
module.exports = user;