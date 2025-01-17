var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const hotelRouter = require('./routes/hotel/hotel');
const flightRouter = require('./routes/Flight/Flight');


var app = express();

require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true, useUnifiedTopology: true 
}, ()=>{
	console.log("DB CONNECTED SUCCESSFULLY");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/hotel', hotelRouter);
app.use('/api/flight', flightRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
