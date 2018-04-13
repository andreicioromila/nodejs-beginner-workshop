const {SHA256} = require('crypto-js');
const mySecret = 'mySecretKey9323w9W(@(@))';

let registerInput = {
	email: 'john@gmail.com',
	password: '123456'
};

let dbInput = {
	email: registerInput.email,
	password: SHA256(registerInput.password + mySecret).toString()
};

let loginInput = {
	email: 'john@gmail.com',
	password: '123456'
};

let loginHashedPassword = SHA256(loginInput.password + mySecret).toString();

if(dbInput.password === loginHashedPassword) {
	console.log('login correct');
} else {
	console.log('login incorrect');
}

console.log(dbInput);
