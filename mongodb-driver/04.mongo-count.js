const MongoClient = require('mongodb').MongoClient;

MongoClient
	.connect('mongodb://localhost:27017/part5')
	.then(db => {
		db
			.collection('Users')
			.find()
			.count()
			.then(result => {
				console.log(result);
			});

		db.close();
	})
	.catch(err => {
		console.log(err);
		console.log('There has been an error connecting do db');
	})
