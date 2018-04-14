const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');

const Thread = require('../models/thread');
const Post = require('../models/post');

const passport = require('passport');
require('../passport-custom')(passport);

router.use('/:threadId/posts', postsRouter);

router.get('/', (req, res, next) => {
	Thread
		.getAll()
		.then(threads => {
			// threads will be an empty array if there are no threads
			res.json(threads);
		})
		.catch(err => {
			console.log(err);
		});
});

router.get('/:id', (req, res, next) => {
	Thread
		.getById(req.params.id)
		.then(thread => {
			// thread will be null if not found
			res.json(thread);
		})
		.catch(err => {
			console.log(err);
		});
});

router.delete('/:id', (req, res, next) => {
	Thread
		.deleteById(req.params.id)
		.then(thread => {
			res.json(thread);
		})
		.catch(err => {
			console.log(err);
		});
});

router.patch('/:id', (req, res, next) => {
	Thread
		.updateThread(req.params.id, req.body.title)
		.then(thread => {
			res.json(thread);
		})
		.catch(err => {
			console.log(err);
		});
});

// router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
// 	res.send('successfully authenticated');
// });

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	let newThread = new Thread({
		title: req.body.title,
		_userId: req.user._id
	});

	// Thread.createThread(newThread, (err) => {}); - we can use callbacks as well

	Thread
		.createThread(newThread)
		.then(thread => {
			let newPost = new Post({
				body: req.body.body,
				_threadId: thread._id,
				_userId: req.user._id
			});

			console.log(newPost);

			Post
				.createPost(newPost)
				.then(post => {
					res.json(thread);
				})
				.catch(err => {
					res.json({ success: false, message: 'Failed to create thread' });
				});
		})
		.catch(err => {
			res.json({ success: false, message: 'Failed to create thread' });
		});
});

module.exports = router;
