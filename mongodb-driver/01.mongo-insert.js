const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/part5', (err, db) => {
	if(err) {
		return console.log('Error connecting to db');
	}

	console.log('Successfully connected');

	db.collection('Users').insertOne({
		id: 8,
		name: 'Jackie'
	}, (err, result) => {
		console.log(result.ops[0]._id.getTimestamp());
	});

	// let myId = new ObjectId();
	// console.log(myId.getTimestamp());

	// inserts 2 users
	// db.collection('Users').insert([{
	// 	firstName: 'Johnny'
	// }, {
	// 	lastName: 'Bravo'
	// }], (err, data) => {
	// 	console.log(data);
	// });

	db.close();
});
