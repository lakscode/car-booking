var mongoose = require('mongoose');

var OfficeSchema = new mongoose.Schema({
  location: String,
  city: String,
  state: String
});

module.exports = mongoose.model('Office', OfficeSchema);
