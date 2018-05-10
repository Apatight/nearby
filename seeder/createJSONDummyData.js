const fs = require('fs');
const faker = require('faker');
const photoRefs = require('../allPhotoRef.json');

const fileName = 'dataList.json';
const entryNum = 10000; // For prod
// const entryNum = 100; // For test

const createEntry = (count) => {
  // Create one photo array
  const photosArr = [];
  for (let j = 0; j < 5; j += 1) {
    photosArr.push(photoRefs[Math.floor(Math.random() * 1000)]);
  }
  // Create nearby array
  const nearbyArr = [];
  for (let j = 0; j < 6; j += 1) {
    nearbyArr.push(Math.floor(Math.random() * entryNum));
  }
  const obj = {
    place_id: count,
    name: faker.name.findName(),
    google_rating: Math.floor(Math.random() * 5.95),
    zagat_rating: Math.floor(Math.random() * 5.95),
    photos: photosArr,
    neighborhood: faker.address.county(),
    price_level: Math.floor(Math.random() * 4.9),
    types: faker.address.city(),
    nearby: nearbyArr,
  };
  return obj;
};


const generateJSON = () => {
  const options = {
    autoClose: true,
  };

  const writeStream = fs.createWriteStream(fileName, options);
  let i = 0;
  const write = () => {
    let ok = true;
    do {
      i += 1;
      if (i === 1) {
        writeStream.write(`[${JSON.stringify(createEntry(i))}`);
      } else {
        ok = writeStream.write(`,${JSON.stringify(createEntry(i))}`);
      }
    } while (i < entryNum && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    } else {
      writeStream.write(']');
    }
  };
  write();
};

generateJSON();
