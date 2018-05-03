const fs = require('fs');
const faker = require('faker');
const photoRefs = require('./allPhotoRef.json');

const fileName = 'dataList.csv';

const entryNum = 10000000; // For production
// const entryNum = 100; // For test

const createEntry = (count) => {
  // Create one photo array
  const photosArr = [];
  for (let i = 0; i < 5; i += 1) {
    photosArr.push(photoRefs[Math.floor(Math.random() * 1000)]);
  }
  // Create nearby array
  const nearbyArr = [];
  for (let j = 0; j < 6; j += 1) {
    nearbyArr.push(Math.floor(Math.random() * entryNum));
  }

  const obj = `${count},${faker.name.findName()},${Math.floor(Math.random() * 5.95)},${Math.floor(Math.random() * 5.95)},"{${photosArr}}",${faker.address.county()},${Math.floor(Math.random() * 4.9)},${faker.address.city()},"{${nearbyArr}}"`;
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
      ok = writeStream.write(`${createEntry(i)}\n`);
    } while (i < entryNum && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    }
  };
  write();
};

generateJSON();
