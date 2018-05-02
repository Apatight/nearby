var db = require('./db/mongodb.js');
var mongoose = require('mongoose');
const fullList = require('./fullList.json');

var mongoUrlDocker = 'mongodb://database/apateez-nearby';
var mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl);
// mongoose.connect(mongoUrlDocker);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open')
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
  mongoose.connect(mongoUrlDocker)
});

var seedDb = (array) => {
  let counter = 0

  var createList = (array) => {
    // console.log('@@@!@!@!@!', array[counter])

    var obj = {
      name: array[counter].name,
      place_id: array[counter].place_id,
      google_rating: array[counter].google_rating,
      zagat_rating: array[counter].zagat_rating,
      photos: array[counter].photos,
      neighborhood: array[counter].neighborhood,
      price_level: array[counter].price_level,
      types: array[counter].types,
      nearby: array[counter].nearby
    }


    // console.log('Restaurant OBJ: ', obj)
    // db.insertMore(array)
    db.insertOne(obj, (err, content) => {
      if (err) {
        console.log("ERROR IS", err)
      } else {
        // console.log('CONTENT is ', content)
        counter++;
        if (counter < 100000) {
          createList(array)
        } else {
          console.log('Saved 1000 Data into DB!')
          mongoose.disconnect();
        }
      }
    })
  }

  db.clearDb(() => createList(array))
}

seedDb(fullList);
