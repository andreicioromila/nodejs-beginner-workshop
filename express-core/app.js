const express = require('express');

let app = express();

app.use((req, res, next) => {
	console.log(`${req.method}: ${req.url} ${new Date().toString()}`);
	next();
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
	res.send('Welcome to our app');
});

app.post('/posts', (req, res) => {
	console.log(req.body);
	let data = '';
	req.on('data', chunk => {
		data += chunk;
	});

	req.on('end', () => {
		let newData = JSON.parse(data);
		res.json(newData);
		res.end();
	});
	//res.send(req.body.firstName);
})

app.get('/posts', (req, res) => {
	console.log(req, res);
	res.json([{
		id: 1,
		title: 'Welcome'
	}, {
		id: 2,
		title: 'To our blog'
	}, {
		id: 3,
		title: 'Description'
	}]);
});

app.get('/posts/:id', (req, res) => {
	res.send(req.params.id);
});

app.get('/comments', (req, res) => {
	res.send(`Sort ${req.query.sort}`);
});

app.listen(8080, () => {
	console.log('start');
});
