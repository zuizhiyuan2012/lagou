var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	username:String,
	password:String,
	use:String,
	pwd:String,
	email:String
});

module.exports = UserSchema;
