const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3004;

const db = require('../db/postgresdb.js');

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
  let results = [];
  db.findOne(placeId)
  .then((data) => {
    results.push(data[0]);
    // console.log('data[0].nearby', data[0].nearby);
    db.findMany(data[0].nearby)
    .then((nearbyData) => {
      // console.log('nearbyData', nearbyData.length);
      results.push(nearbyData);
      res.status(200);
      res.send(results);
    })
    .catch((err) => {
      return next(err);
    })
  })
  .catch((err) => {
    return next(err);
  })
})

app.listen(PORT, () => {
  console.log('connected to port:', PORT)
});
