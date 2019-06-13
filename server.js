const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'johndoe@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},

		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],

	login: [
		{
			id: '123',
			hash: '',
			email: 'johndoe@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.json(database.users);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach( user => {
		if (user.id === id){
			found = true;
			return res.json(user);
			} 		
		})
	if (!found){
		res.status(404).json('No such user');
	}
})

app.put('/image', (req,res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach( user => {
		if (user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
			} 		
		})
	if (!found){
		res.status(404).json('No such user');
	}
})


app.post('/signin', (req, res) => {

	bcrypt.compare("apples", '$2a$08$NgE2h77UpWbglM9JL30udOy80efa20PNWSrriMthWmuDi8ULRIWaa', function(err, res) {
    	console.log('First guess: ',res);
	});
	bcrypt.compare("not_bacon", '$2a$08$NgE2h77UpWbglM9JL30udOy80efa20PNWSrriMthWmuDi8ULRIWaa', function(err, res) {
	    console.log('Second guess: ', res);
	});

	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json('success');
	} else {
		res.json('fail');
}})

app.post('/register', (req,res) => {
	const { email, password, name } = req.body;

	bcrypt.hash( password, 8, function(err, hash) {
		console.log(hash);
    });

	database.users.push(
			{
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
			}
		);
	res.send(database.users[database.users.length-1]);
	})

app.listen(3000, () => {
	console.log('App is running on port 3000.')
});



/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT (for updating) --> user


*/

