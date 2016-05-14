/*eslint strict: ["error", "global"]*/
/* eslint-disable no-console */
'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    expressValidator = require('express-validator'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util'),

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
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(expressValidator());

// Serve index.html on root
app.get('/', function(req, res) {
    res.redirect('./index.html');
});

// Serve app on port 3000
app.listen(3000, function() {
    console.log('App listening on port 3000!');
});

app.post('/api/people', function(req, res) {

    req.checkBody({
        email: {
            notEmpty: true,
            isEmail: {
                errorMessage: 'That doesn\'t look like an email address, please try again'
            }
        },
        names: {
            notEmpty: true,
            errorMessage: 'Please provide the names of who is coming'
        },
        bus: {
            notEmpty: true,
            errorMessage: 'Please let us know if you\'d use a bus if one is provided'
        },
        extraInfo: {
            optional: true,
            isLength: {
                options: [{ max: 500 }],
                errorMessage: 'Wow, that\'s a lot of information, please shorten your message to ' +
                    'under 500 characters and give us a call instead'
            }
        }
    });

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send(util.inspect(errors));
        return;
    }

    // Connect to mongo
    MongoClient.connect(url, function(err, db) {
        var body = req.body;

        // Couldn't connect to DB
        if (err) {
            res.status(500).send({message: 'Can\'t connect to the DB :('});
        } else {
            insertPerson(db, {
                names: body.names,
                bus: body.bus,
                email: body.email,
                extraInfo: body.extraInfo || ''
            }, function() {
                db.close();
                res.status(200).send({});
            });
        }
    });
});
