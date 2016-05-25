var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Location = require('../models/Location.js');

/* GET /locations listing. */
router.get('/', function(req, res, next) {

  Location.find(function (err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
 
  
  

  
});

/* POST /locations */
router.post('/', function(req, res, next) {
  Location.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /locations/id */
router.get('/:id', function(req, res, next) {
  Location.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /locations/:id */
router.put('/:id', function(req, res, next) {
  Location.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /locations/:id */
router.delete('/:id', function(req, res, next) {
  Location.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
