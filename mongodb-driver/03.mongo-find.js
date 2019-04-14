const MongoClient = require('mongodb').MongoClient

MongoClient
  .connect('mongodb://localhost:27017')
  .then(client => client.db('test-driver'))
  .then(db => {
    return db
      .collection('Users')
      .find()
      .toArray()
      .then(users => {
        console.log(users)
      })
  })
  .catch(err => {
    console.log(err)
    console.log('There has been an error connecting do db')
  })
