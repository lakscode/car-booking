var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
  name: String,
  source: String,
  destination: String,
  time: String,
  carnumber: String
});

module.exports = mongoose.model('Booking', BookingSchema);
