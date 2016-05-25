var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Car = require('../models/Car.js');

/* GET /cars listing. */
router.get('/', function(req, res, next) {
  Car.find(function (err, cars) {
    if (err) return next(err);
    res.json(cars);
  });
});

/* POST /cars */
router.post('/', function(req, res, next) {
  Car.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /cars/id */
router.get('/:id', function(req, res, next) {
  Car.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /cars/:id */
router.put('/:id', function(req, res, next) {
  Car.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /cars/:id */
router.delete('/:id', function(req, res, next) {
  Car.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
