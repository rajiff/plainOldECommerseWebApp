/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
}