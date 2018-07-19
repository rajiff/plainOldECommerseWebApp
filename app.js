/*!
 * Copyright(c) 2016 Basavaraj K N <rajiff@gmail.com>
 */

/**
 * Module dependencies
 */

const express = require('express'),
  path = require('path'),
  join = require('path').join,
  fs = require('fs'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  expressSession = require('express-session'),
  flash = require('connect-flash'),
  connectRoles = require('connect-roles'),
  formidable = require('formidable');

const config = require('./config/config'),
  models = join(__dirname, 'app/models');

const app = express();

// view engine setup
app.set('views', config.root + '/app/views');
app.set('view engine', 'ejs');

//Logging
log = 'dev';
app.use(logger(log));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'ABC-eCommerce',
  cookie: {
    maxAge: 3600000
  },
  resave: false,
  saveUninitialized: false/*,
  store: new mongoStore({
      url: config.db,
      collection : 'sessions'
    })*/
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/passport')(passport);
require('./config/routes')(app, passport);

app.onListening = function(addr) {
  //Connect to DB
  mongoose.connect(config.db, function(err) {
    if(err) {
      console.log(err);
      throw err;
    }
  });

  console.log('Nodejs Express app - ABC eCommerce has started on port ' + addr.port);
}

/**
 * Expose
 */
module.exports = app;

