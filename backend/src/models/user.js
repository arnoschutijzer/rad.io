const mongoose = require('mongoose');
const crypto = require('crypto');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    this.salt = crypto.randomBytes(10).toString('hex');

    this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64)
      .toString('hex');
    return next();
  } else {
    return next();
  }
});

schema.methods.comparePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  if (hash !== this.password) {
    return Promise.reject('Incorrect username/password');
  } else {
    return Promise.resolve();
  }
};

schema.set('toJSON', {
  transform: (doc, ret) => {
    // Don't return the salt & password
    delete ret.password;
    delete ret.salt;
    return ret;
  }
});

const model = mongoose.model('User', schema);

module.exports = model;
