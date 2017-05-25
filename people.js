var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var peopleSchema = new Schema({
	name: {type: String},
	title: {type: String}
});


var People = mongoose.model('People', peopleSchema);

module.exports = People;