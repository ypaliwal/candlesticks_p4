var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	passwordHash: String,
	stockArr: String
});

module.exports = mongoose.model('user', UserSchema)