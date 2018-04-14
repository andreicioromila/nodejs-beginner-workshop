const mongoose = require('mongoose');
const slug = require('slug');

const Post = require('./post');
const User = require('./user');

const ThreadSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	_userId: {
		required: true,
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
}, {
	toJSON: {
		virtuals: true
	}
});

ThreadSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: '_threadId'
});

ThreadSchema.virtual('user', {
	ref: 'User',
	localField: '_userId',
	foreignField: '_id'
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;

module.exports.createThread = thread => {
	// can be done with callbacks as well, but we will use promises
	thread.slug = slug(thread.title, { lower: true });
	return thread.save();
};

module.exports.getAll = () => {
	return Thread
					.find({})
					.populate({
						path: 'user',
						select: 'email'
					});
};

module.exports.getById = id => {
	// return Thread
	// 				.findOne({ _id: id })
	// 				.then(thread => {
	// 					return Post
	// 						.getPostsByThreadId(id)
	// 						.then(posts => {
	// 							thread.posts = posts;
	// 							return thread;
	// 						});
	// 				});
	return Thread
					.findOne({ _id: id })
					.populate({
						path: 'posts',
						model: 'Post'
					})
	//return Thread.findOne({ _id: id });
};

module.exports.updateThread = (id, title) => {
	return Thread
	.findOne({ _id: id })
	.then(thread => {
		thread.title = title;
		thread.slug = slug(thread.title, { lower: true });
		return thread.save();
	});
};

module.exports.deleteById = id => {
	return Thread.findOneAndRemove({ _id: id });
};
