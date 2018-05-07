const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3004;

const db = require('../db/postgresdb.js');
// const db = require('../db/mongodb.js');

// Redis
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

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

app.get('/api/restaurants/:id/nearby', (req, res, next) => {
  const placeId = req.params.id;
  client.get(placeId, function(error, result) {
    if (result) {
      res.status(200);
      res.send(result);
    } else {
      let results = {};
      db.findOne(placeId)
      .then((data) => {
        results.restaurant = data[0];
        db.findMany(data[0].nearby)
        .then((nearbyData) => {
          results.nearby = nearbyData
          client.setex(placeId, 60, JSON.stringify(results));
          res.status(200);
          res.send(results);
        })
        .catch((err) => {
          throw err;
        })
      })
      .catch((err) => {
        throw err;
      }
    }
  })
})

app.listen(PORT, () => {
  // console.log('connected to port:', PORT)
});
