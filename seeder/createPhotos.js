// run node createPhotos.js to pull all image reference IDs and place them into an array.
// Array is stored in allPhotoRef.json

const fs = require('fs');
const AllData = require('./195-Zagat-AllData.json')

const createPhotosJSON = (array) => {
  let photosArr = [];
  array.forEach((el) => {
    // console.log(el.result.photos)
    if (!!el.result.photos) {
      el.result.photos.forEach((el2) => {
        photosArr.push(el2.photo_reference)
      })
    }
  })
  return photosArr
}

// createPhotosJSON(AllData);
let results = createPhotosJSON(AllData);


fs.appendFileSync('./allPhotoRef.json', JSON.stringify(results), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
