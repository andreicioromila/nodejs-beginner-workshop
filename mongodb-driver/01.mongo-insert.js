const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    return console.log('Error connecting to db')
  }

  const db = client.db('test-driver')

  console.log('Successfully connected')

  db.collection('Users').insertOne({
    id: 8,
    name: 'Jackie'
  }, (err, result) => {
    console.log(result.ops[0], result.ops[0]._id.getTimestamp())
    client.close()
  })

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
})
