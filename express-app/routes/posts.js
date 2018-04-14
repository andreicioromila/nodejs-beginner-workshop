const mongoose = require('mongoose');
const router = require('express').Router({ mergeParams: true });

const Post = require('../models/post');

const passport = require('passport');
require('../passport-custom')(passport);

router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	//cast anything to ObjectId - not necessary below, it casts automatically
	//let threadObjectId = new mongoose.Types.ObjectId(req.params.threadId);
	console.log('post correct', req.body);

	let newPost = new Post({
		body: req.body.body,
		_threadId: req.params.threadId,
		_userId: req.user._id
	});

	Post
		.createPost(newPost)
		.then(post => {
			res.json(post);
		})
		.catch(err => {
			console.log(err);
		})
});

router.get('/', (req, res, next) => {
	Post
		.getPostsByThreadId(req.params.threadId, req.query.sort)
		.then(posts => {
			res.json(posts);
		})
		.catch(err => {
			console.log(err);
		})
});

router.get('/:id', (req, res, next) => {
	Post
		.getPostById(req.params.id)
		.then(post => {
			res.json(post);
		})
		.catch(err => {
			console.log(err);
		})
});

router.patch('/:id', (req, res, next) => {
	Post
		.updatePost(req.params.id, req.body.body)
		.then(post => {
			res.json(post);
		})
		.catch(err => {
			console.log(err);
		});
});

router.delete('/:id', (req, res, next) => {
	Post
		.deletePostById(req.params.id)
		.then(post => {
			res.json(post);
		})
		.catch(err => {
			console.log(err);
		})
})

module.exports = router;
