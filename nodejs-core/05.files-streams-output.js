var fs = require('fs');

var msg = 'Hello World!';

var outputStream = fs.createWriteStream('output.txt');

outputStream.write(msg);
outputStream.write('Test');
outputStream.end();
