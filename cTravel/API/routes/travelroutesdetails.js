var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var TravelRouteDetails = require('../models/TravelRouteDetails.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  TravelRouteDetails.find(function (err, TravelRoutesDetails) {
    if (err) return next(err);
    res.json(TravelRoutesDetails);
  });
});


router.post('/routeId', function(req, res, next) {
console.log(req.name);
  TravelRouteDetails.find({ routeId: req.body.routeId}, function (err, TravelRoutesDetails) {
    if (err) return next(err);
    res.json(TravelRoutesDetails);
  });
});


/*
router.get('/', function(req, res, next) {
  TravelRouteDetails.find({name: req.body.routId}, function (err, TravelRoutesDetails) {
    if (err) return next(err);
    res.json(TravelRoutesDetails);
  });
});

*/

/* POST /TravelRoutes */
router.post('/', function(req, res, next) {
  TravelRouteDetails.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /TravelRoutes/id */
router.get('/:id', function(req, res, next) {
  TravelRouteDetails.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /TravelRoutes/:id */
router.put('/:id', function(req, res, next) {
  TravelRouteDetails.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /TravelRoutes/:id */
router.delete('/:id', function(req, res, next) {
  TravelRouteDetails.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
