var express = require('express');
var wagner = require('wagner-core');

module.exports = function() {
console.log('from sever alt');

var app = express();


/*var wagner = require('../schemas').model;
wagner();

//broken code because of wagner
app.use('/api/v1', require('../api')(wagner));*/

app.get('/', function(req, res) {
  res.send('Hello, world!');
});

app.get('/user/:user', function(req, res) {
  res.send('Page for user ' + req.params.user);
});

app.listen(3000);
console.log('Server listening on port 3000!');

};