// Requires
var express = require('express');
var bodyParser = require('body-parser');
// var Mongoose = require('mongoose');
var fs = require('fs');
var http = require('http');
var app = express();
var port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/:subject/:name',function(req,res){

  var filename = __dirname + '/data_sets/' + req.params.subject +'/' + req.params.name + '.csv';
  // console.log('FILENAME: ',filename);
  var readStream = fs.createReadStream(filename);

  readStream.on('error', function (err) {
    res.status(404)
    .send({ error: 'Not found' });
  });

  readStream.on('open', function () {
    res.set({
      'Content-Type': 'text/csv',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    });
    readStream.pipe(res);
  });

  readStream.on('end', function () {
    console.log(filename + ' served to ' + req.connection.remoteAddress);
  });


});

app.get('/', function (req, res) {
  res.json({hello: "world"});
});

// Server
app.listen(port);

console.log('UHERO Innovation API running at http://127.0.0.1:' + port + '/');
