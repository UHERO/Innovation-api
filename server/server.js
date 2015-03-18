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

app.get('/economics/:name',function(req,res){
  var options = {
    root: __dirname + '/',
    dotfiles: 'allow',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

   var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
  
});

// Server
var server = app.listen(4567, function () {
  
  var host = server.address().address;
  var port = server.address().port;

  console.log('UHero API listening at http://%s:%s', host, port);
});
