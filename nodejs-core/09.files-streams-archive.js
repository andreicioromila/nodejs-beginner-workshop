var fs = require('fs'),
		gzip = require('zlib');

var inputStream = fs.createReadStream('input.txt');
var outputStream = fs.createWriteStream('archive.gz');
var archiveStream = gzip.Gzip();

inputStream
	.pipe(archiveStream)
	.pipe(outputStream);
