var mongoose = require('mongoose');

var TravelRouteSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('TravelRoute', TravelRouteSchema);



