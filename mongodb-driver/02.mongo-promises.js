// will not run

db.collection('Users').insert({id: 5}, (err, result) => {
	let userId = result.ops[0]._id;
	db.collection('Todos').insert({name: 'fix car'}, (err, result) => {

	});
}

db
	.collection('Users')
	.insert({id: 5})
	.then(result => {
		return result.ops[0]._id;
	})
	.then(result => {
		console.log(result);
	})
	.catch(err => {});

function check(x) {
	return new Promise((resolve, reject) => {
		if(x === 5) {
			resolve(true);
		} else {
			reject(false);
		}
	});
}

async function test() {
	let x = 5;
	let bool = await check(x);
	// will continue executing when promise has been resolved/rejected
}
