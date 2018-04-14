const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
			.then(salt => {
				return bcrypt
					.hash(user.password, salt)
					.then(hash => {
						user.password = hash;
						next();
					});
			})
			.catch(next);
	}
});

UserSchema.methods.comparePassword = function(password) {
	return bcrypt
		.compare(password, this.password);
};

let User = mongoose.model('User', UserSchema);

module.exports = User;
