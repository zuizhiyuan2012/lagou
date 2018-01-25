var mongoose = require("mongoose");

var PositionSchema = mongoose.Schema({
	logo:String,
	position:String,
	company:String,
	experience:String,
	type:String,
	site:String,
	pay:String,
	order:String
});

module.exports = PositionSchema;
