# Requirements

[MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x).
[Robomongo](https://robomongo.org/download) is useful.

# Server

1. Run npm install to gather depedencies.
1. Create a `data` directory to store your data
1. Start a mongo process with `mongod --dbpath=./data`
1. Run `gulp` to start your server (watching for changes)

To simulate a POST: curl -X POST -H "Content-Type: application/json" -d '{"hello": "world"}' http://localhost:3000/api/people

# TODOs

*Server*

* Only open DB connection once on startup, and shut it down when the server exits
* Validation for the json received from the client
