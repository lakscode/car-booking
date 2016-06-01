var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port  = process.env.PORT || 3000;


var routes = require('./routes/index');
var locations = require('./routes/locations');
var cars = require('./routes/cars');
var users = require('./routes/users');
var bookings = require('./routes/bookings');
var offices = require('./routes/offices');
var travelroutes = require('./routes/travelroutes');
var travelroutesdetails = require('./routes/travelroutesdetails');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TravelDB', function(err) {
    if(err) {
        console.log('mongodb://localhost/TravelDB - connection error', err);
    } else {
        console.log('mongodb://localhost/TravelDB - connection successful');
    }
});

var app = express();

app.listen(port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes, function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
 allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.use('/locations', locations);

app.use('/offices', offices);

app.use('/cars', cars);
 
app.use('/users', users);

app.use('/bookings', bookings);
 
app.use('/travelroutes', travelroutes); 

app.use('/travelroutesdetails', travelroutesdetails); 



app.use(function(req, res, next) {
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) { 
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


console.log('   running at port %s', port);


