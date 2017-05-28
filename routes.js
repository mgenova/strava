var Athletes = require('./controllers/athletes');

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
	  	config: Athletes.getAll
	  	
  	},
   	{
	  	method: 'POST',
	  	path: '/api/v1/athletes',
	  	config: Athletes.create
	  	
  	}, 	
  	{
  		method: 'GET',
  		path: '/api/v1/athlete/{id}',
  		config: Athletes.getOne
  		
  	},

  	{
  		method: 'DELETE',
  		path: '/api/v1/athlete/{id}',
  		config: Athletes.remove	
  	},
  	{ 	
  		method: 'PUT',
  		path: '/api/v1/athlete/{id}',
  		config: Athletes.update	
    }

]

/*

exports.endpoints =  function(server, options, next) {
	server.route({
		method: 'POST',
	  	path: '/api/v1/athletes',
	  	config: Athletes.getAll
	});

	server.route({
		method: 'GET',
  		path: '/api/v1/athlete/{id}',
  		config: Athletes.getOne
	});

	server.route({
		method: 'DELETE',
  		path: '/api/v1/athlete/{id}',
  		config: Athletes.remove	
	});

	server.route({
		method: 'PUT',
  		path: '/api/v1/athlete/{id}',
  		config: Athletes.update	
	});
	next();
};
*/
	  	