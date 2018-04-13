var fs = require('fs');

var inputStream = fs.createReadStream('input.txt', {
	highWaterMark: 1
});
var outputStream = fs.createWriteStream('output.txt');

var i = 0,
		allData = '';

inputStream.on('data', function(data) {
	i++;
	allData += data;
	console.log('COUNTER: ', i);
	console.log(data);
	outputStream.write(data);
})

inputStream.on('end', function() {
	console.log('stream end');
	outputStream.end();
})

//outputStream.end();
