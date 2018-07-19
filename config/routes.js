/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const auth = require('./authorization');

const userCtrlr = require('../app/controllers/users');
const prodCtrlr = require('../app/controllers/products');

module.exports = function(app, passport) {

	app.get("/", auth.isAuthenticated, function(req, res) {
		res.redirect('/home');
	});

	app.get("/signup", userCtrlr.signup);
	app.post("/users", userCtrlr.createUser);

	app.get("/login", userCtrlr.login);
	app.post("/user/session", passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash: true
	}));
	app.get("/logout", userCtrlr.endSession);

	app.get("/home", auth.isAuthenticated, prodCtrlr.home);
	app.get("/products/new", auth.isAuthenticated, prodCtrlr.new);
	app.post("/products", auth.isAuthenticated, prodCtrlr.createProduct);

	// catch all 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;

		console.log(err.status + " " + err.message);
		console.log(err);

		next(err);
	});

	// Error handler, which will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);

			console.log(err.status + " " + err.message);
			console.log(err);

			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		
		console.log(err.status + " " + err.message);
		console.log(err);

		res.render('error', {
			message: err.message,
			error: {}
		});
	});
};