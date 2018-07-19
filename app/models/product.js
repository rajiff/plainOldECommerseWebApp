/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
	id: String,	
	name: { type: String, required: true, index: true, trim: true },
	description: { type: String, required: true, trim: true }, 
	unitsAvailable: { type: Number, required: true },
	unitPrice: { type: Number, required: true },
	img: { type: String, default: '' },
	soldByVendor: { type: String, required: true, index: true },
	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});

ProductSchema.path('name').validate(function(name) {
	if (this.skipValidation()) return true;
	return name.length;
}, 'Product title cannot be blank');

ProductSchema.path('description').validate(function(description) {
	if (this.skipValidation()) return true;
	return description.length;
}, 'Description cannot be blank');

ProductSchema.path('unitsAvailable').validate(function(unitsAvailable) {
	if (this.skipValidation()) return true;
	return (unitsAvailable > 0);
}, 'Unit quantity should be non-zero positive value');

ProductSchema.path('unitPrice').validate(function(unitPrice) {
	if (this.skipValidation()) return true;
	return (unitPrice > 1);
}, 'Unit price should be non-zero positive value');

ProductSchema.path('soldByVendor').validate(function(soldByVendor) {
	if (this.skipValidation()) return true;
	return soldByVendor.length;
}, 'Username, who is adding product must be specified');

/**
 * Pre-save hook
 */
ProductSchema.pre('save', function(next) {
	if (!this.isNew) 
		return next();

	next();
});

/**
 * Methods
 */
ProductSchema.methods = {

	skipValidation: function() { return false; }
};

ProductSchema.statics = {
	list: function(options, callback) {
		const criteria = options.criteria || {};
		const page = options.page || 0;
		const limit = options.limit || 30;
		return this.model('Product').find(criteria)
			.sort({
				created_at: -1
			})
			.limit(limit)
			.skip(limit * page)
			.exec(function(err, data) {
				if (err)
					throw err;

				callback(data);
			});
	}
};

module.exports = mongoose.model('Product', ProductSchema);