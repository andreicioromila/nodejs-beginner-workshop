const MongoClient = require('mongodb').MongoClient;

MongoClient
	.connect('mongodb://localhost:27017/part5')
	.then(db => {
		db
			.collection('Users')
			.find()
			.toArray()
			.then(result => {
				let myUser = result[0];
				return Promise.resolve(myUser);
			})
			.then(user => {
				console.log(user);
			});

		db.close();
	})
	.catch(err => {
		console.log(err);
		console.log('There has been an error connecting do db');
	})
