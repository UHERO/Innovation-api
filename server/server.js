// Requires
var express = require('express');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');

var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', function (req, res) {
  res.json({hello: "world"});
});

// Server
var server = app.listen(4567, function () {
  
  var host = server.address().address;
  var port = server.address().port;

  console.log('UHero API listening at http://%s:%s', host, port);
});
