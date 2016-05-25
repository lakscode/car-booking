var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  location: String,
  city: String,
  state: String
});

module.exports = mongoose.model('Location', LocationSchema);
