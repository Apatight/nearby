const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongodb = require('../db/mongodb.js');
// const postgresdb = require('../db/postgresdb.js');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/restaurants/:id/nearby', (req, res) => {
  // console.log('app got')
  const placeId = req.params.id;
  // console.log("req.params.id " + req.params.id);
  // find recommended restaurants based on id
  const results = [];
  mongodb.findOne(placeId, (err, data) => {
    if (err) {
      res.status(500);
      throw err;
    } else {
      // console.log('restaurant info: ', data);
      // const nearbyArr = data[0].nearby;
      // console.log('Nearby Arr: ', nearbyArr);
      results.push(data[0]);

      mongodb.findMany(data[0].nearby, (dbErr, content) => {
        if (dbErr) {
          res.status(500);
          throw (dbErr);
        } else {
          // console.log('recommended restaurants:', content);
          results.push(content);
          // console.log(`number of recommended: ${content.length}`);
          res.status(200);
          // console.log('Results Length: ', results.length);
          res.send(results);
        }
      });
    }
  });
});

app.listen(3004, () => {
  // console.log('Apateez app listening on port 3004!');
});
