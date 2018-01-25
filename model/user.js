var mongoose = require("mongoose");

var UserSchema = require('../schema/user');


var User = mongoose.model('users',UserSchema);

module.exports = User;