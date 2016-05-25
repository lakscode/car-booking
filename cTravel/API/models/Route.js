var mongoose = require('mongoose');

var RouteSchema = new mongoose.Schema({
  name: String,
  pin: String
});

module.exports = mongoose.model('Route', RouteSchema);



