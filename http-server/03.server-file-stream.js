const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	// 1. bad way
	// let inputHtml = fs.readFileSync('index.html');
	// res.write(inputHtml);
	// res.end();

	// 2. better way
	// let htmlStream = fs.createReadStream('index.html');
	// htmlStream.on('data', (data) => {
	// 	console.log(data);
	// 	res.write(data);
	// });
	//
	// htmlStream.on('end', () => {
	// 	res.end();
	// });

	// 3. best way
	let htmlStream = fs.createReadStream('index.html');
	htmlStream.pipe(res);
}).listen(1337);
