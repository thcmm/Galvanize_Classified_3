'use strict';
////////////////////////////
// app.js                 //
// Galvanize Classified 2 //
///////////////////////////

const express = require('express');
const path = require('path');
require('dotenv').config(); // Heroku hublueblabla
const app = express();
var bodyParser = require('body-parser');

const messages = require('./routes/classifieds');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

app.use('/classifieds',messages);


app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Use Brendans sever config /bin/www
// Startup from package.json

// const port = process.env.PORT || 3000;
//
// app.listen(port, () => {
//   console.log('Listening on port', port);
// });

module.exports = app;
