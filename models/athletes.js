var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var peopleSchema = new Schema({
	name: {type: String},
	title: {type: String}
});

module.exports = mongoose.model('People', peopleSchema);
