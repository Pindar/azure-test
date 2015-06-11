var database = require('./database.js');
var azure = require('azure-storage');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/insert', function (req, res) {
  var entGen = azure.TableUtilities.entityGenerator;
  var entity = {
    PartitionKey: entGen.String('datapoints'),
    RowKey: entGen.String('row1'),
    boolValueTrue: entGen.Boolean(true),
    boolValueFalse: entGen.Boolean(false),
    intValue: entGen.Int32(42),
    dateValue: entGen.DateTime(new Date(Date.UTC(2011, 10, 25))),
    complexDateValue: entGen.DateTime(new Date(Date.UTC(2013, 02, 16, 01, 46, 20)))
  };
  
  
  database.insertEntitiy(entity);
  res.send('Insert sample data to database');
});

app.get('/top-five', function (req, res) {
  
  database.query(res);  
});

var server = app.listen(process.env.PORT || 1337, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});