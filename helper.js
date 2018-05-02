const fs = require('fs');
const faker = require('faker');


let generateJSON = () => {

  counter = 10000000;
  for (var i = 0; i < counter; i++) {
    let photoArr = [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]
    let nearbyArr = [];
    for (var j = 0; j < 6; j++) {
      nearbyArr.push(Math.floor(Math.random()*1000000))
    }

    let obj = {
      name: faker.name.findName(),
      place_id: `${i}`,
      google_rating: Math.floor(Math.random() * 5.95),
      zagat_rating: Math.floor(Math.random() * 5.95),
      photos: photoArr,
      neighborhood: faker.address.county(),
      price_level: Math.floor(Math.random() * 4.9),
      types: faker.address.city(),
      nearby: nearbyArr
    }

    if (i === counter - 1) {
      fs.appendFileSync('./fullList.json', JSON.stringify(obj)+']', function (err) {
      if (err) throw err;
      console.log('Saved!', obj);
      });
    } else {
      fs.appendFileSync('./fullList.json', JSON.stringify(obj)+',', function (err) {
      if (err) throw err;
      console.log('Saved!', obj);
      });
    }
  }
}

generateJSON();


// mongoimport --jsonArray -d apateez-nearby -c restaurants --file fullList.json --numInsertionWorkers 8
