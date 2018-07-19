/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	var options = {
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	};

	var login = function(req, email, password, done) {
		// check in mongo if a user with email exists or not      
		User.findOne({
				'email': email
			},
			function(err, user) {
				if (err)
					return done(err);
				if (!user) {
					return done(null, false, req.flash('message', 'Invalid..! username or crdentials not matched.'));
				}
				if (!user.authenticate(password)) {
					return done(null, false, req.flash('message', 'Invalid..! username or crdentials not matched.'));
				}
				return done(null, user);
			}
		);
	};

	passport.use('login',
		new LocalStrategy(options, login)
	);
};