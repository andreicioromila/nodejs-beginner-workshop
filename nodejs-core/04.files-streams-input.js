var fs = require('fs');

var inputStream = fs.createReadStream('input.txt', {
	encoding: 'utf8',
	highWaterMark: 2 // standard is 64kb
});

inputStream.on('data', function(data) {
	console.log(data);
})
