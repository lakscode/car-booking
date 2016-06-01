var mongoose = require('mongoose');

var TravelRouteDetailsSchema = new mongoose.Schema({
  name: String,
  routeId: String, 
  priority : Number
  
});

module.exports = mongoose.model('TravelRouteDetails', TravelRouteDetailsSchema);



