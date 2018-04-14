const mongoose = require('mongoose');
const Thread = require('./thread');
const User = require('./user');

const PostSchema = new mongoose.Schema({
	body: String,
	_threadId: {
		required: true,
		type: mongoose.Schema.ObjectId,
		ref: 'Thread'
	},
	_userId: {
		required: true,
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	toJSON: {
		virtuals: true
	}
});

PostSchema.virtual('user', {
	ref: 'User',
	localField: '_userId',
	foreignField: '_id'
});

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;

module.exports.getPostsByThreadId = (threadId, sortDirection = 'asc') => {
	// return Post
	// 	.find({ _threadId: threadId })
	// 	.then(posts => {
	// 		let fullPosts;
	// 		posts.forEach(post => {
	// 			Thread
	// 				.getById(post._threadId)
	// 				.then(thread => {
	// 					post.thread = thread;
	// 				});
	// 		});
	// 	});

	let sortOperator = '';
	if(sortDirection === 'desc') {
		sortOperator = '-';
	}

	return Post
					.find({ _threadId: threadId })
					.populate({
						path: 'user',
						select: 'email'
					})
					.populate('_threadId', 'title')
					.sort(`${sortOperator}createdAt`)
					.exec();
	//return Post.find({ _threadId: threadId });
}

module.exports.createPost = post => {
	return post.save();
}

module.exports.getPostById = id => {
	return Post.findOne({ _id: id });
}

module.exports.updatePost = (id, body) => {
	return Post
		.findOne({ _id: id })
		.then(post => {
			post.body = body;
			return post.save();
		})
		.catch(err => {
			console.log(err);
		});
}

module.exports.deletePostById = id => {
	return Post.findOneAndRemove({ _id: id });
}
