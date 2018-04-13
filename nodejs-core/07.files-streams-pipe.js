var fs = require('fs');

var inputStream = fs.createReadStream('input.txt', {
	highWaterMark: 1
});

var outputStream = fs.createWriteStream('output.txt');

inputStream.pipe(outputStream);

// will add at the beginning
outputStream.write('x');

// will throw and error because pipe also ends the stream
// inputStream.on('end', function() {
// 	outputStream.write('z');
// })
