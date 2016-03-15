//top level js file


var express = require('express');
var wagner = require('wagner-core');

require('./schemas/models')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner));

app.listen(3000);


/*

var fn = require('./other_file_root.js');
fn();

//inside the directory will get the index js file and look for the other function
var otherDirFn = require('./another_directory').other;
otherDirFn();


var server = require('./server_directory').listen;
server();


var _ = require('underscore');
//each is a function from underscore that
//executes a funtion for each ele in array
_.each([1, 2, 3], function(v){
	console.log(v);
});


//include category.js file 
var category = require('./server_directory').cat;
category();

*/




/////////////////////////////////////

/*var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
//connect with mongo db
mongodb.MongoClient.connect(uri, function(error, db) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  var doc = {
    title : 'Jaws',
    year : 1975,
    director : 'Steven Spielberg',
    rating : 'PG',
    ratings : {
      critics : 80,
      audience : 97
    },
    screenplay : ['Peter Benchley', 'Carl Gotlieb']
  };

  db.collection('movies').insert(doc, function(error, result){
    if(error){
      console.log(error);
      process.exit(1);
    }

    //find execute a query in mongodb. Only find() returns all data
    //var query = {year : 1975} find(query)
    //find({'ratings.audience' : {'$gte':90}}) audience > 90
    db.collection('movies').find().toArray(function(error, docs){
      if(error){
        console.log(error);
        process.exit(1);
      }

      console.log('Found docs:');
      docs.forEach(function(doc){
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });

  });

  db.collection('sample').insert({ x: 1 }, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }

    db.collection('sample').find().toArray(function(error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }

      console.log('Found docs:');
      docs.forEach(function(doc) {
        console.log(JSON.stringify(doc));
      });
      process.exit(0);
    });
  });
});*/

//1.3.6 trocar para localhost 
//atom crtl shift 