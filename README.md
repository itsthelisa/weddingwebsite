# Requirements

[MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x).
[Robomongo](https://robomongo.org/download) is useful.

## Database setup

1. Create a `data` directory to store your data (you only need to do this once).
1. Start a mongo process with `mongod --dbpath=./data` (we'll need to manage this in the server in the long run)

## Setup

To fetch packages first:

``` npm install ``` (dev dependencies)
``` bower install ``` (client side dependencies)

To build:

``` gulp build ```

To clean built files:

``` gulp clean ```

This will empty the public folder, with the exception of bower_components.

## Serving

``` gulp ``` or
``` gulp watch ```

This will build, serve and watch your files for changes.

# TODOs

*Server*

* Only open DB connection once on startup, and shut it down when the server exits
* Validation for the json received from the client
