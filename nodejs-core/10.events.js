var Emitter = require('events');

var notifications = new Emitter();
console.log('new emitter instance');

function greetAgainCallback() {
	console.log('notification: greet again');
}

notifications.on('greet', function(data) {
	console.log(data);
	console.log('notification: greet');
	console.log(`Hello, ${data.name}`);
	notifications.removeListener('greet', greetAgainCallback)
});

notifications.on('greet', greetAgainCallback);

console.log('test');

notifications.emit('greet', {
	name: 'Jane Doe'
});
notifications.emit('greet', {
	name: 'John Doe'
});

console.log('emitter has a message');
