var mongoose = require('mongoose');

var PositionSchema = require("../schema/position");

var Position = mongoose.model('positions',PositionSchema);

module.exports = Position;
