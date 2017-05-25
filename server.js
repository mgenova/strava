Hapi = require('hapi');
const People = require('./people');
const Boom = require('boom');
const Joi = require('joi');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.register(require('vision'), function(err) {

	if(err) {
		throw err;
	}
	
	server.route([
	  	{
		    method: 'GET',
		    path: '/',
		    handler: function(request, reply) {
		      reply('Hello world from hapi');
	    	}
	  	},
	  	{	
		  	//Get all people
		  	method: 'GET',
		  	path: '/api/v1/persons',
		  	handler: function(request, reply) {
		  		People.find(function(err, docs){
		  			if (err) {
		  				return reply(Boom.wrap(err, 'Internal MongoDB error'));
		  			}
		  			reply(docs);
		  		});
	  		}
	  	},
	  	{
		  	//create a new person
		  	method: 'POST',
		  	path: '/api/v1/persons',
		  	handler: function(request, reply) {
		  		
		  		newPerson = new People();
		  		newPerson.name = request.payload.name;
		  		newPerson.title = request.payload.title;

		  		newPerson.save(function(err, person){
		  			if(err) {
		  				return reply(Boom.wrap(err, 'Internal MondoDB erro'));
		  			}
					reply(person).code(201)
		  		});
		  		
	  		}
	  	},
	  	{
	  		//get a single person
	  		method: 'GET',
	  		path: '/api/v1/persons/{id}',
	  		handler: function(request, reply) {
	  			People.findOne({_id: request.params.id }, (err, doc) => {
	  					if(err) {
	  						return reply(Boom.wrap(err, 'Internal MondoDB error'));
	  					}

	  					if(!doc) {
	  						return reply(Boom.notFound());
	  					}
	  					reply(doc);
	  				}
	  			)
	  		}
	  	},

	  	{
	  		//delete a single person
	  		method: 'DELETE',
	  		path: '/api/v1/persons/{id}',
	  		handler: function(request, reply) {
	  			People.remove({
			        _id: request.params.id }, function (err, result) {
			            if (err) {
			                return reply(Boom.wrap(err, 'Internal MongoDB error'));
			            }
			            if (result.n === 0) {
			                return reply(Boom.notFound());
			            }
			            reply().code(204);
			        });
			    }
			
	  	},
	  	{ 	//update an existing person
	  		method: 'PUT',
	  		path: '/api/v1/persons/{id}',
	  		handler: function(request, reply) {
	  			People.update({_id: request.params.id}, { $set: request.payload}, function(err, doc){
		            if (err) {
		                return reply(Boom.wrap(err, 'Internal MongoDB error'));
		            }
	  				
	  				reply(doc).code(204)
	  			})
	  		}
	    }
	]);

	server.start(function() {
	    console.log('Listening on ' + server.info.uri);
	});

}); //server.register










