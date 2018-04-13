const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	let inputHtml = fs.readFileSync('index.html', 'utf8');
	let username = 'johnny123';
	inputHtml = inputHtml.replace('{username}', username);
	res.write(inputHtml);
	res.end();
}).listen(1337);
