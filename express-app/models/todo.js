const mongoose = require('mongoose');

const User = require('./user');

const TodoSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String
	},
	_userId: {
		required: true,
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	done: {
		required: true,
		type: Boolean,
		default: false
	}
}, {
	toJSON: {
		virtuals: true
	}
});

TodoSchema.virtual('user', {
	ref: 'User',
	localField: '_userId',
	foreignField: '_id'
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;

module.exports.createForUserId = (userId, title) => {
	let newTodo = new Todo({
		_userId: userId,
		title: title
	});

	return newTodo.save();
};

module.exports.getAllByUserId = userId => {
	return Todo.find({ _userId: userId });
};

module.exports.getByIdAndUserId = (id, userId) => {
	return Todo.find({ _id: id, _userId: userId });
}

module.exports.deleteByIdAndUserId = (id, userId) => {
	return Todo.findOneAndRemove({ _id: id, _userId: userId });
};

module.exports.updateByIdAndUserId = (id, userId, title) => {
	return Todo
		.findOne({ _id: id, _userId: userId })
		.then(todo => {
			todo.title = title;
			return todo.save();
		});
};

module.exports.getTodoById = id => {
	return Todo.findOne({ _id: id });
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
	// return Thread
	// 				.findOne({ _id: id })
	// 				.populate({
	// 					path: 'posts',
	// 					model: 'Post'
	// 				})
	//return Thread.findOne({ _id: id });
};
