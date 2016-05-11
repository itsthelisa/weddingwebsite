'use strict';

var bodyParser = require('body-parser'),
	express = require('express'),
	path = require('path'),
	MongoClient = require('mongodb').MongoClient,

	// Connection URL
	url = 'mongodb://localhost:27017/wedding',

	// The app
	app = express();

function insertPerson(db, person, callback) {
	// ALL THE PEOPLE?!
	var collection = db.collection('people');

	// Have one more!
	collection.insertOne(person, function(err, result) {
		// FIXME handle this error
		callback(result);
	});
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Serve index.html on root
app.get('/', function (req, res) {
  res.redirect('/index.html');
});

// Serve app on port 3000
app.listen(3000, function () {
	console.log('App listening on port 3000!');
});

app.post('/api/people', function (req, res) {

	// Connect to mongo
	MongoClient.connect(url, function(err, db) {

		// Couldn't connect to DB
		if (err) {
  			res.status(500).send({message: 'Can\'t connect to the DB :('});
		} else {
			insertPerson(db, req.body, function() {
				db.close();
				res.status(200).send();
			});
		}
	});
});
