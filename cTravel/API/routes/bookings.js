var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Booking = require('../models/Booking.js');

/* GET /bookings listing. */
router.get('/', function(req, res, next) {
  Booking.find(function (err, bookings) {
    if (err) return next(err);
    res.json(bookings);
  });
});

/* POST /bookings */
router.post('/', function(req, res, next) {
  Booking.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /bookings/id */
router.get('/:id', function(req, res, next) {
  Booking.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /bookings/:id */
router.put('/:id', function(req, res, next) {
  Booking.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /bookings/:id */
router.delete('/:id', function(req, res, next) {
  Booking.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/check', function(req, res, next) {
  Booking.findOne({ time: req.body.time, carnumber: req.body.carnumber }, function (err, booking) {
    if (err) return next(err);
    res.json(booking);
  });
});

module.exports = router;
