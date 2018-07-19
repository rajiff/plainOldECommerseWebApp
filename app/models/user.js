/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');

var validUserRoles = [
	'admin',
	'customer',
	'employee',
	'vendor',
];
var defaultRole = 'customer';

exports.validUserRoles = validUserRoles;
exports.defaultRole = defaultRole;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	id: String,
	username: { type: String, required: true, index: { unique: true }, trim: true },
	hash_password: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true }, trim: true },
	role: { type: String, required: true, index: true },
	firstName: { type: String, required: true, trim: true},
	lastName: { type: String, required: true, trim: true},
	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});

//virtuals
UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.hash_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

UserSchema
	.virtual('userrole')
	.set(function(userrole) {
		userrole = userrole.toLowerCase();

		this._userrole = userrole;
		this.role = this.normalizedRole(userrole);		
	})
	.get(function() {
		return this._userrole;
	});

//Validations
UserSchema.path('username').validate(function(username) {
	if (this.skipValidation()) return true;
	return username.length;
}, 'Username cannot be blank');

UserSchema.path('email').validate(function(email) {
	if (this.skipValidation()) return true;
	return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function(email, fn) {
	const User = mongoose.model('User');
	if (this.skipValidation()) fn(true);

	// Check only when it is a new user or when email field is modified
	if (this.isNew || this.isModified('email')) {
		User.find({
			email: email
		}).exec(function(err, users) {
			fn(!err && users.length === 0);
		});
	} else fn(true);
}, 'Email already exists');

UserSchema.path('firstName').validate(function(firstName) {
	if (this.skipValidation()) return true;
	return firstName.length;
}, 'First name cannot be blank');

UserSchema.path('lastName').validate(function(lastName) {
	if (this.skipValidation()) return true;
	return lastName.length;
}, 'Last name cannot be blank');

UserSchema.path('hash_password').validate(function(hash_password) {
	if (this.skipValidation()) return true;
	return hash_password.length;
}, 'Password cannot be blank');

UserSchema.path('role').validate(function(role) {
	if (this.skipValidation()) return true;
	return role.length;
}, 'User role cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
	if (!this.isNew) 
		return next();

	if (!(this.password && this.password.length) && !this.skipValidation()) {
		next(new Error('Invalid password'));
	}

	if (!(this.userrole && this.userrole.length) && !this.skipValidation()) {
		next(new Error('Invalid user role'));
	}

	next();
});

/**
 * Methods
 */
UserSchema.methods = {

	authenticate: function(plainText) {
		return bCrypt.compareSync(plainText, this.hash_password);
	},

	encryptPassword: function(plainText) {
		return bCrypt.hashSync(plainText, bCrypt.genSaltSync(10), null);
	},

	normalizedRole: function(role) {
		if (role === undefined || role == '' || (validUserRoles.indexOf(role) <= -1) ) {
			role = defaultRole;
		}
		return role;
	},

	skipValidation: function() { return false; }
};

mongoose.model('User', UserSchema);