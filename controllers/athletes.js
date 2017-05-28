var Joi = require('joi');
var Boom = require('boom');
var Athlete = require('../models/athletes');




module.exports = {
	getAll : {
	    description: 'Get all athletes',
	  	handler: function(request, reply) {
	  		Athlete.find(function(err, docs){
				if(err) {
					return reply(Boom.wrap(err, 'Internal MondoDB error'));
				}
				if(!docs) {
					return reply(Boom.notFound());
				}
				reply(docs);
	  		})
		}
	},
	getOne : {
		description:'Get athlete by ID',
	    handler: function(request, reply) {
		  	Athlete.findOne({_id: request.params.id }, (err, doc) => {
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
	create : {
	    description: 'Add an athlete',
	    handler: function(request, reply) {		
	  		newPerson = new Athlete();
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
	update : {
		description: 'Update athlete by ID',
	    handler: function(request, reply) {
			Athlete.update({_id: request.params.id}, { $set: request.payload}, (err, doc) => {
		        if (err) {
		            return reply(Boom.wrap(err, 'Internal MongoDB error'));
		        }
					reply(doc).code(204);
			})
		}
	},
	remove : {
		description: 'Remove athlete by ID',
	    handler: function(request, reply) {
			Athlete.remove({_id: request.params.id }, (err, doc) => {
				if (err) {
	            	return reply(Boom.wrap(err, 'Internal MongoDB error'));
		        }
		        
		        reply().code(204);
			});
		}
	}
}




