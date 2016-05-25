var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET /users listing. */
router.get('/', function(req, res, next) {
  Route.find(function (err, Routes) {
    if (err) return next(err);
    res.json(Routes);
  });
});

/* POST /Routes */
router.post('/', function(req, res, next) {
  Route.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Routes/id */
router.get('/:id', function(req, res, next) {
  Route.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Routes/:id */
router.put('/:id', function(req, res, next) {
  Route.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Routes/:id */
router.delete('/:id', function(req, res, next) {
  Route.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
