var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Office = require('../models/Office.js');

/* GET /offices listing. */
router.get('/', function(req, res, next) {
  Office.find(function (err, offices) {
    if (err) return next(err);
    res.json(offices);
  });
});

/* POST /offices */
router.post('/', function(req, res, next) {
  Office.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /offices/id */
router.get('/:id', function(req, res, next) {
  Office.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /offices/:id */
router.put('/:id', function(req, res, next) {
  Office.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /offices/:id */
router.delete('/:id', function(req, res, next) {
  Office.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});





module.exports = router;
