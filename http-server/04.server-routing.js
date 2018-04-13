const http = require('http');

http.createServer((req, res) => {
	console.log(req.url);
	if(req.url === '/blog') {
		// display  blog
	} else if(req.url === '/') {
		// display home
	}
	res.end();
}).listen(1337);
