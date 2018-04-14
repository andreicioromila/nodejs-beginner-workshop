const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
	//this - current document
	let user = this;

	if(this.isModified('password') || this.isNew) {
		bcrypt
			.genSalt(10)
			.then(salt => bcrypt.hash(user.password, salt))
			.then(hash => {
				user.password = hash;
				next();
			})
			.catch(next);
	}
});

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

let User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.createUser = (email, password) => {
	let newUser = new User({ email, password });
	return newUser.save();
}

module.exports.login = (email, password) => {
	return User
		.findOne({ email: email })
		.then(user => {
			return user
				.comparePassword(password)
				.then(itMatches => {
					if(itMatches) {
						let payload = {
							_id: user._id,
							email: user.email
						};

						let token = jwt.sign(payload, config.secret, { expiresIn: 6000 });
						return Promise.resolve(token);
					} else {
						return Promise.reject();
					}
				});
		});
}
