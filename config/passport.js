/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose');
const local = require('./passport/local');
const User = mongoose.model('User');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  local(passport);
}