const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

const passport = require('passport');
require('../passport-custom')(passport);

router.get('/', (req, res, next) => {
	Todo
		.getAll()
		.then(todos => {
			// todos will be an empty array if there are no todos
			res.json(todos);
		})
		.catch(err => {
			console.log(err);
		});
});

router.get('/:id', (req, res, next) => {
	Todo
		.getById(req.params.id)
		.then(todo => {
			// todo will be null if not found
			res.json(todo);
		})
		.catch(err => {
			console.log(err);
		});
});

router.delete('/:id', (req, res, next) => {
	Todo
		.deleteById(req.params.id)
		.then(todo => {
			res.json(todo);
		})
		.catch(err => {
			console.log(err);
		});
});

router.patch('/:id', (req, res, next) => {
	Todo
		.updateTodo(req.params.id, req.body.title)
		.then(todo => {
			res.json(todo);
		})
		.catch(err => {
			console.log(err);
		});
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	let newTodo = new Todo({
		title: req.body.title,
		_userId: req.user._id
	});

	Todo
		.createTodo(newTodo)
		.then(todo => {
			res.json(todo);
		})
		.catch(err => {
			res.json({ success: false, message: 'Failed to create todo' });
		});
});

module.exports = router;
