var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');

var mongoose = require('mongoose');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

var ssloptions = {
  key: fs.readFileSync('./serverKey/localhost.key', 'utf8'),
  cert: fs.readFileSync('./serverKey/localhost.crt', 'utf8')
};

mongoose.Promise = global.Promise;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ポート設定
app.set('httpsport', process.env.PORT || 3000);
app.set('httpport', process.env.PORT || 4000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// サーバ立ち上げ
https.createServer(ssloptions,app).listen(app.get('httpsport'), function(){
    console.log('Express HTTPS server listening on port ' + app.get('httpsport'));
    mongoose.connect('mongodb://localhost/HackHack');
});

module.exports = app;
