var fs = require('fs');

fs.readFile('input.txt', function(err, data) {
	console.log(err, data);
})
