var fs = require('fs');

setInterval(function() {
	var inputStream = fs.createReadStream('input.txt');
	var outputStream = fs.createWriteStream('output.txt');

	inputStream.pipe(outputStream);
}, 100);
