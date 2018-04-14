const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.js');
const threads = require('./routes/threads.js');
const users = require('./routes/users.js');

mongoose.connect(config.database);
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connection.on('connected', () => {
	console.log('Connected to Database successfully');
});

mongoose.connection.on('error', (err) => {
	console.log(`Errors while connecting to database: ${err}`);
});

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/threads', threads);
app.use('/users', users);

app.listen(config.port, () => {
	console.log('App started successfully');
});
