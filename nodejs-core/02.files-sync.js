var fs = require('fs');

console.log(__dirname, __filename);

var input = fs.readFileSync('input.txt');
var input2 = fs.readFileSync('input.txt', 'utf8');

console.log(input); // buffer
console.log(input.toString());

//already string
console.log(input2);
