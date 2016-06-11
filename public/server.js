/*eslint strict: ["error", "global"]*/
/* eslint-disable no-console */
'use strict';
var bodyParser = require('body-parser'),
    express = require('express'),
    expressValidator = require('express-validator'),
    compression = require('compression'),
    MongoClient = require('mongodb').MongoClient,
    util = require('util'),

    // Connection URL
    url = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding',

    // The app
    app = express();

console.log(process.env.MONGODB_URI);

var PEOPLE_COLLECTION = 'people';

// Serve static files
app.use(compression());
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(expressValidator());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log('Database connection ready');

    // Initialize the app.
    var server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        console.log('App now running on port', port);
    });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({'error': message});
}

// Serve index.html on root
app.get('/', function(req, res) {
    res.redirect('./index.html');
});

app.post('/api/people', function(req, res) {

    req.checkBody({
        email: {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Please fix up the email address, it doesn\'t look quite right.'
            }
        },
        names: {
            notEmpty: true,
            errorMessage: 'Please provide the names of each person attending.'
        },
        attending: {
            notEmpty: true,
            errorMessage: 'Please let us know if you plan on attending.'
        },
        bus: {
            notEmpty: true,
            errorMessage: 'Please let us know if you\'d use a bus if one is provided.'
        },
        extraInfo: {
            optional: true,
            isLength: {
                options: [{ max: 500 }],
                errorMessage: 'Wow, that\'s a lot of information, please shorten your message to ' +
                    'under 500 characters and give us a call or email instead.'
            }
        }
    });

    var body = req.body;

    var person = {
        names: body.names,
        bus: body.bus,
        attending: body.attending,
        email: body.email,
        extraInfo: body.extraInfo || ''
    };

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    person.createDate = new Date();

    db.collection(PEOPLE_COLLECTION).insertOne(person, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to create new person.');
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});
