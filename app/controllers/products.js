/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose'),
	Product = mongoose.model('Product'),
    formidable = require('formidable'),
	fs = require("fs"),
	path = require('path'),
	mkdirp = require('mkdirp'),
	config = require('../../config/config');

//var socket = require('socket.io-client')('http://localhost:3000/abc-employee');
var socket = require('socket.io-client')((config.host+'/abc-employee'));

exports.home = function(req, res) {
	const page = (req.query.page > 0 ? req.query.page : 1) - 1;
	const limit = 10;
	const options = {
		limit: limit,
		page: page
	};

	Product.count({}, function(err, count) {
		Product.list(options, function(products) {
			var pages = Math.ceil(count / limit);

			console.log("count ", count, " limit", limit, " pages: ", pages);

			res.render('productsHome', {
				user: req.user,
				message: ((count <= 0) ? 'Products are coming soon, till then cha..! cha..!' : req.flash('message')),
				products: products,
				page: page + 1,
				pages: pages
			});
		});
	});
};

exports.new = function(req, res) {
	res.render('newproduct', {
		user: req.user,
		message: req.flash('message')
	});
};

exports.createProduct = function(req, res, next) {
	__createProduct = function() {
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			var product = new Product();
			product.name = fields.name;
			product.description = fields.description;
			product.unitsAvailable = fields.qtyunits;
			product.unitPrice = fields.unitprice;
			product.img = "";
			product.soldByVendor = req.user.email;

			product.save(function(err, product) {
				if (err) {
					console.log(err);
					req.flash('Sorry! We could not add your product, try again later!');
					next(err);
				}

				//console.log("Product added successfully");

				//upload image
				uploadProductImages(files, product, req, res, next, function(product) {
					socket.on('connection')
					socket.emit('newproduct', {name: product.name,
						description: product.description,
						img: product.img,
						unitsAvailable: product.unitsAvailable,
						unitPrice: product.unitPrice,
						soldByVendor: product.soldByVendor
					});
				});
				//update product with image path
			});
		});
	};
	process.nextTick(__createProduct);
};

function uploadProductImages(files, product, req, res, next, eventcallback) {
	var productpic = files['productpic'];

	var imgrelpath = '/products/' + product._id;
	var imgpath = path.join(__dirname, ('../../public/' + imgrelpath));

	mkdirp(imgpath, function(err) {
		if (err) {
			console.error(err);
			next(err);
		}
	});

	imgpath = path.join(imgpath, productpic.name);
	imgrelpath += "/" + productpic.name;

	try {
		fs.rename(productpic.path, imgpath, function(err) {
			if (err) {
				console.log(err);
				next(err);
			}
		});
	}
	catch(err) {
		console.log(err);
		next(err);
	}
	//Absolute path is not required to be stored 
	product.img = imgrelpath;

	product.save(function(err, product) {
		if (err) {
			console.log(err);
			next(err);
		}

		//console.log("Product updated with image saved at " + product.img);

		eventcallback(product);

		return res.redirect('/');
	});
}

