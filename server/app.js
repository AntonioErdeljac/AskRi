const fs = require('fs');
const http = require('http');
const path = require('path');
const methods = require('methods');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'AskRi', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
app.use(errorhandler());

mongoose.connect('mongodb://localhost/askri');
mongoose.set('debug', true);


require('./models/User');
require('./config/passport');
app.use(require('./routes'));

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(!isProduction){
  app.use(function(err, req, res, next){
      console.log(err.stack);

      res.status(err.status || 500);

      res.json({'errors': {
          message: err.message,
          error: err
      }})
  })
}


app.use(function(err, req,res, next){
  res.status(err.status || 500);
  res.json({'errors': {
      message: err.message,
      error: {}
  }})
});

const server = app.listen(8000, () => {
  console.log('Listening on http://localhost:8000/');
});
