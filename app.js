var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');

var apiRouter = require('./routes/api');

var app = express();


//app.use(bodyParser.json({limit: '150mb'}));
//app.use(bodyParser.urlencoded({limit: '150mb', extended: false}));
//var dblink = 'mongodb://dbuser09:option123@cluster0-shard-00-00-3qiop.mongodb.net:27017,cluster0-shard-00-01-3qiop.mongodb.net:27017,cluster0-shard-00-02-3qiop.mongodb.net:27017/ngnode?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
var dblink =  'mongodb://127.0.0.1:27017/ngnode';
const db = mongoose.connect(dblink, { useNewUrlParser: true },function(err){
  if(err)
    console.log('Unable to connect database');
});
app.use(session({secret: 'skysitesecret',resave: false,saveUninitialized: true,cookie: { secure: false,maxAge: 3600000 }}));
app.use(logger('dev'));
app.use(express.json({ limit: '150mb'}));
app.use(express.urlencoded({ extended: false, limit: '150mb' }));
app.use(express.static(path.join(__dirname, 'dist/ngnode')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));
//app.use('/', express.static(path.join(__dirname, 'dist/ngnode')));
app.use('/api', apiRouter);
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/ngnode/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);

  
});

process.on('Exception', function (error) {
  console.log(error.stack);
});

module.exports = app;
