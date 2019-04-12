const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');
const User = require('./models/user');

module.exports = passport => {
	let opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.secret
	};

	passport.use(new JwtStrategy(opts, (payload, done) => {
		User
			.getPublicUserById({ _id: payload._id })
			.then(user => {
				if(user) {
					done(null, user);
				} else {
					done(null, false);
				}
			})
			.catch(err => {
				console.log(err);
			})
	}));
}
