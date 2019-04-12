const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config.js')
const middlewares = require('./infrastructure/middlewares')
const todos = require('./routes/todos.js')
const users = require('./routes/users.js')

global.AppError = require('./infrastructure/AppError')

mongoose.connect(config.database)
mongoose.Promise = global.Promise
mongoose.set('debug', true)

mongoose.connection.on('connected', () => {
  console.log('Connected to Database successfully')
})

mongoose.connection.on('error', (err) => {
  console.log(`Errors while connecting to database: ${err}`)
})

let app = express()
app.use(bodyParser.json())
app.use('/todos', todos)
app.use('/users', users)
app.use(middlewares.errorHandling)

app.listen(config.port, () => {
  console.log('App started successfully')
})
