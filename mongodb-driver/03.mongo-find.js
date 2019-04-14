const MongoClient = require('mongodb').MongoClient

MongoClient
  .connect('mongodb://localhost:27017')
  .then(client => ({ client, db: client.db('test-driver') }))
  .then(({ client, db }) => {
    return db
      .collection('Users')
      .find()
      .toArray()
      .then(users => {
        console.log(users)
      })
      .then(() => client)
  })
  .then(client => client.close())
  .catch(err => {
    console.log(err)
    console.log('There has been an error connecting do db')
  })
