/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = function(req, res) {
	res.render('login', {
		message: req.flash('message')
	});
};

exports.startSession = function(req, res) {
	console.log("Starting new user session");
};

exports.endSession = function(req, res) {
	req.logout();
	res.redirect('/login');
};

exports.signup = function(req, res) {
	res.render('signup', {
		message: req.flash('message')
	});
};

exports.createUser = function(req, res, next) {
	var saveUser = function() {
		var user = new User();

		// set the user's local credentials
		user.username = req.param('username');
		user.password = req.param('password');
		user.email = req.param('email');
		user.userrole = req.param('role');
		user.firstName = req.param('firstName');
		user.lastName = req.param('lastName');

		user.save(function(err, user) {
			if (err) {
				console.log(err);
				next(err);
			}

			console.log("User created successfully..!");

			req.login(user, err => {
				if (err) {
					console.log("Sorry! We are not able to log you in!");
					req.flash('Sorry! We are not able to log you in!');
					next(err);
				}

				return res.redirect('/');
			});
		});
	};

	process.nextTick(saveUser);

};