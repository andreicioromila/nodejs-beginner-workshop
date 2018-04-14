const mongoose = require('mongoose');
const router = require('express').Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passport-custom')(passport);
let User = require('../models/user');

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
	res.send('successfully authenticated');
});

router.post('/register', (req, res) => {
	let newUser = new User({
		email: req.body.email,
		password: req.body.password
	});

	// usually we should create a method on the user model
	// and use that method to work with mongoose & mongodb, not use mongoose directly
	newUser
		.save()
		.then(user => {
			console.log(user);
			res.json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(409).send('problem adding user');
		});
});

router.post('/login', (req, res) => {
	User
		.findOne({ email: req.body.email })
		.then(user => {
			user
				.comparePassword(req.body.password)
				.then(itMatches => {
					if(itMatches) {
						let payload = {
							_id: user._id,
							email: user.email
						};
						let token = jwt.sign(payload, config.secret, { expiresIn: 6000 });
						res.json({ success: true, token: 'JWT ' + token});
					} else {
						res.send({error: true});
					}
				});
		})
		.catch(err => {
			res.send({error: true});
		})
});

module.exports = router;
