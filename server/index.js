require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3004;
const http = require('http');
http.globalAgent.maxSockets = 50;

// Trying compression
const compression = require('compression')
// const db = require('../db/postgresdb.js'); // For Postgres
const db = require('../db/mongodb.js'); // For Mongo

// Redis
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient({ "host":'redis', "port": REDIS_PORT });
// const client = redis.createClient( REDIS_PORT );

// Trying compression
app.use(compression({
 filter: function () { return true; },
}));

//Create a middleware that adds a X-Response-Time header to responses.
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

// Postgres only
// app.get('/api/restaurants/:id/nearby', (req, res, next) => {
//   const placeId = req.params.id;
//   const results = {};
//   db.findOne(placeId)
//   .then((data) => {
//     results.restaurant = data[0];
//     db.findMany(data[0].nearby)
//     .then((nearbyData) => {
//       results.nearby = nearbyData
//       // client.setex(placeId, 60, JSON.stringify(results));
//       client.setnx(placeId, JSON.stringify(results));
//       res.status(200);
//       res.send(results);
//     })
//     .catch((err) => {
//       throw err;
//     })
//   })
//   .catch((err) => {
//     throw err;
//   })
// })

// Redis
const getRestaurant  = (req, res) => {
  let placeId = req.params.id;
  const results = {};
  db.findOne(placeId)
  .then((data) => {
    results.restaurant = data[0];
    db.findMany(data[0].nearby)
    .then((nearbyData) => {
      results.nearby = nearbyData
      // client.setex(placeId, 60, JSON.stringify(results));
      client.setex(placeId, 60*60, JSON.stringify(results));
      res.status(200);
      res.send(results);
    })
    .catch((err) => {
      throw err;
    })
  })
  .catch((err) => {
    throw err;
  })
}

const getCache = (req, res, next) => {
  let placeId = req.params.id;
  client.get(placeId, (err, result) => {
    if (result) {
      res.status(200);
      res.send(result);
    } else {
      getRestaurant(req, res);
    }
  });
}

app.get('/api/restaurants/:id/nearby', getCache);

app.listen(PORT, () => {
  // console.log('connected to port:', PORT)
});
