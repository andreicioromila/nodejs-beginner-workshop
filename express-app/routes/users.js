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
	User
		.createUser(req.body.email, req.body.password)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(409).send('problem adding user');
		});
});

router.post('/login', (req, res) => {
	User
		.login(req.body.email, req.body.password)
		.then(jwt => {
			res.json({ success: true, token: 'JWT ' + jwt});
		})
		.catch(err => {
			res.send(err);
		});
});

module.exports = router;
