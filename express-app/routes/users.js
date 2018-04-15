const mongoose = require('mongoose');
const router = require('express').Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passport-custom')(passport);
let User = require('../models/user');

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
	console.log(req.user);
	res.send('successfully authenticated');
});

router.post('/register', (req, res, next) => {
	User
		.createUser(req.body.email, req.body.password)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			next(new AppError(err, 'User could not be created', 409))
		});
});

router.post('/login', (req, res, next) => {
	User
		.login(req.body.email, req.body.password)
		.then(jwt => {
			res.json({ success: true, token: 'JWT ' + jwt});
		})
		.catch(err => {
      next(new AppError(err, 'User could not be authenticated', 401))
		});
});

module.exports = router;
