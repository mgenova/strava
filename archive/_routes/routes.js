var Controller = require('./controller');

module.exports = [
	{
		method: 'GET',
		path: '/',
		handler: function(request, reply){
			reply('Access API @ /api/v1/')
		}
	},
  	{
	  	method: 'GET',
	  	path: '/api/v1/athletes',
	  	config: Controller.getAll
	  	
  	},
   	{
	  	method: 'POST',
	  	path: '/api/v1/athletes',
	  	config: Controller.create
	  	
  	}, 	
  	{
  		method: 'GET',
  		path: '/api/v1/athlete/{id}',
  		config: Controller.getOne
  		
  	},

  	{
  		method: 'DELETE',
  		path: '/api/v1/athlete/{id}',
  		config: Controller.remove	
  	},
  	{ 	
  		method: 'PUT',
  		path: '/api/v1/athlete/{id}',
  		config: Controller.update	
    }

]

/*

exports.endpoints =  function(server, options, next) {
	server.route({
		method: 'POST',
	  	path: '/api/v1/athletes',
	  	config: Controller.getAll
	});

	server.route({
		method: 'GET',
  		path: '/api/v1/athlete/{id}',
  		config: Controller.getOne
	});

	server.route({
		method: 'DELETE',
  		path: '/api/v1/athlete/{id}',
  		config: Controller.remove	
	});

	server.route({
		method: 'PUT',
  		path: '/api/v1/athlete/{id}',
  		config: Controller.update	
	});
	next();
};
*/
	  	