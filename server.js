var Hapi = require('hapi'),
	routes = require('./routes'),
    config = require('./config'),
    Mongoose = require('mongoose');



//Server Configuration
Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);

var db = Mongoose.connection;
var server = new Hapi.Server();


//Server Intialization

server.connection({port: config.server.port});

server.route(routes);


server.start(function() {
    console.log('Server started ', server.info.uri);
});



//Database Events
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});








