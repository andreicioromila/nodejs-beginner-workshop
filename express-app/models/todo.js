const mongoose = require('mongoose');
const slug = require('slug');

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
		type: Boolean
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

module.exports.createTodo = todo => {
	// can be done with callbacks as well, but we will use promises
	return todo.save();
};

module.exports.getAll = () => {
	return Todo
					.find({})
					.populate({
						path: 'user',
						select: 'email'
					});
};

module.exports.getTodosByUserId = (userId) => {

}

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

module.exports.updateTodoById = (id, title) => {
	return Todo
	.findOne({ _id: id })
	.then(todo => {
		todo.title = title;
		return todo.save();
	});
};

module.exports.deleteTodoById = id => {
	return Todo.findOneAndRemove({ _id: id });
};
