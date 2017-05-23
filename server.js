Hapi = require('hapi');


var server = new Hapi.Server();
server.connection({ port: 8080 });

var people = [{
	"name": "Marga",
	"title": "System Admin"

},{
	"name": "Derrick",
	"title": "IT Manager"
}];



server.route([
  	{
	    method: 'GET',
	    path: '/',
	    handler: function(request, reply) {
	      reply('Hello world from hapi');
    }
  	},
  	{
	  	//Get list
	  	method: 'GET',
	  	path: '/api/v1/persons',
	  	handler: function(request, reply) {
	  		reply(people);
  		}
  	},
  	{
	  	//add a new person
	  	method: 'POST',
	  	path: '/api/v1/persons',
	  	handler: function(request, reply) {
	  		newPerson = {
	  			"name":request.payload.name,
	  			"title":request.payload.title 
	  		};
	  		people.push(newPerson);
	  		reply(people).code(201);	//201 created
  		}
  	},
  	{
  		//get a single person
  		method: 'GET',
  		path: '/api/v1/persons/{id}',
  		handler: function(request, reply) {
  			reply(people[request.params.id]);
  		}
  	},

  	{
  		//delete a single person
  		method: 'DELETE',
  		path: '/api/v1/persons/{id}',
  		handler: function(request, reply) {
  			delete(people[request.params.id]);
  			reply().code(204);
  		}
  	},
  	{ 	//update an existing person
  		method: 'PUT',
  		path: '/api/v1/persons/{id}',
  		handler: function(request, reply) {
  			newPerson = {
	  			"name":request.payload.name,
	  			"title":request.payload.title 
	  		};
	  		people[request.params.id] = newPerson;
	  		reply(people);	
  		}
    }








]);







server.start(function() {
    console.log('Listening on ' + server.info.uri);
});