const express = require('express');

let app = express();

let id=0
const jokes = [{id,joke:'A horseman had a horse and the horse had nothing against it',punchLine:''}]


app.use((req, res, next) => {
	console.log(`${req.method}: ${req.url} ${new Date().toString()}`);
	next();
});

const findJoke=(req, res, next) => {
	let i
	for(i=0;i<jokes.length;i++){
		if(JSON.stringify(jokes[i].id)===req.params.id){
			req.location=i;
			next()
		}
	}
	if(i===jokes.length&&req.params.id!=jokes[i-1].id){
		res.writeHead(404)
		res.end()
	}
}

app.use(express.static(`${__dirname}/public`));

app.get('/jokes/:id',findJoke, (req, res) => {
	res.json(jokes[req.location]);
});

app.get('/jokes', (req, res) => {
	res.json(jokes);
});

app.post('/jokes', (req, res) => {
	let joke = {id,joke:req.body.joke,punchLine:req.body.punchLine?req.body.punchLine:''}
	jokes.push(joke)
	res.json(joke)
})

app.delete('/jokes/:id',findJoke, (req, res) => {
	jokes.splice(i,1)
	res.writeHead(200)
	res.end()
})

app.put('/jokes/:id',findJoke, (req, res) => {
	let joke = {id:req.params.id,joke:req.body.joke,punchLine:req.body.punchLine?req.body.punchLine:''}
	jokes[i]=joke
	res.json(joke)
})

app.patch('/jokes/:id',findJoke, (req, res) => {
	let joke = {id:req.params.id,joke:req.body.joke?req.body.joke:jokes[i].joke,punchLine:req.body.punchLine?req.body.punchLine:jokes[i].punchLine}
	jokes[i]=joke
	res.json(joke)
})

app.listen(8080, () => {
	console.log('start');
});
