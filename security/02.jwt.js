const jwt = require('jsonwebtoken');
const secret = 'asdkasnd@#@#das';

let user = {
	id: 5,
	email: 'test@gmail.com'
}

let token = jwt.sign(user, secret);

let decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTUwMDk3NzQ3OX0.f5Qam94IINso2hYSnG6OaRW1noJV-XB-I8LI9JfQQGw', secret);

console.log(decoded);
