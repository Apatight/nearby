const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/mongodb.js');
const mongoose = require('mongoose');

var mongoUrlDocker = 'mongodb://database/apateez-nearby';
var mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl);
// mongoose.connect(mongoUrlDocker);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open')
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
  mongoose.connect(mongoUrlDocker)
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/restaurants/:id/nearby', function(req, res) {
	var placeId = req.params.id;
  console.log("GET " + req.url); 

  // find recommended restaurants based on id
  var results = [];
  db.findOne(placeId, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      console.log("restaurant info: ", data);
      var nearbyArr = data[0].nearby;
      console.log('Nearby Arr: ', nearbyArr);
      results.push(data[0]);

      db.findMany(nearbyArr, (err, data)=> {
        if(err) {
          res.status(500);
          console.log(err);
        } else{
          console.log("recommended restaurants:", data);
          results.push(data)
          console.log("number of recommended: " + data.length);
          res.status(200);
          console.log('Results Length: ', results.length);
          res.send(results);
        }
      });
    }
  });
})

app.listen(3004, function () { console.log('Apateez app listening on port 3004!') });