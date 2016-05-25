var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
  name: String,
  phone: String,
  carnumber: String,
  location: String
});

module.exports = mongoose.model('Car', CarSchema);
