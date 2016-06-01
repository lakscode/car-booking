var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var TravelRoute = require('../models/TravelRoute.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  TravelRoute.find(function (err, TravelRoutes) {
    if (err) return next(err);
    res.json(TravelRoutes);
  });
});

/* POST /TravelRoutes */
router.post('/', function(req, res, next) {
  TravelRoute.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /TravelRoutes/id */
router.get('/:id', function(req, res, next) {
  TravelRoute.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /TravelRoutes/:id */
router.put('/:id', function(req, res, next) {
  TravelRoute.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /TravelRoutes/:id */
router.delete('/:id', function(req, res, next) {
  TravelRoute.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
