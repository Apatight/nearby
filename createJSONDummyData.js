const fs = require('fs');
const faker = require('faker');
const photoRefs = require('./allPhotoRef.json')

const fileName = 'dataList.json'
const entryNum = 10000000;
// const entryNum = 100; // For test

const createEntry = (count) => {
  // Create one photo array
  let photosArr = [];
  for (var j = 0; j < 5; j++) {
    photosArr.push(photoRefs[Math.floor(Math.random() * 1000)])
  }
  // Create nearby array
  let nearbyArr = [];
  for (let j = 0; j < 6; j++) {
    nearbyArr.push(Math.floor(Math.random()*entryNum))
  }
  let obj = {
    place_id: ${count},
    name: faker.name.findName(),
    google_rating: Math.floor(Math.random() * 5.95),
    zagat_rating: Math.floor(Math.random() * 5.95),
    photos: photosArr,
    neighborhood: faker.address.county(),
    price_level: Math.floor(Math.random() * 4.9),
    types: faker.address.city(),
    nearby: nearbyArr
  }
  return obj;
}



let generateJSON = () => {
  let options = {
    autoClose: true
  };

  let writeStream = fs.createWriteStream(fileName, options);
  let i = 0;
  let write = function() {
    let ok = true;
    do {
      i++;
      if (i === 1) {
        writeStream.write('[' + JSON.stringify(createEntry(i))+ ',');
      } else {
        ok = writeStream.write(JSON.stringify(createEntry(i))+ ',');
      }
    } while (i < entryNum && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
}

generateJSON();




// Run after
// truncate -s -1 fullList2.json
// echo ] >> fullList2.json
// mongoimport --jsonArray -d apateez-nearby -c restaurants --file fullList.json --numInsertionWorkers 8
