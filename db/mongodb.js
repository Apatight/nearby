const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-nearby';
const mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl); // Try localhost first
mongoose.connection.on('connected', () => {
  // console.log('Mongoose connection open');
});
mongoose.connection.on('error', () => {
  // console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

const restaurantSchema = mongoose.Schema({
  place_id: { type: Number, unique: true },
  name: String,
  google_rating: Number,
  zagat_rating: Number,
  photos: [String],
  neighborhood: String,
  price_level: Number,
  types: String,
  nearby: [Number],
});

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

// findAll retrieves all stories
// const findAll = (callback) => {
//   // console.log('finding all!');
//   RestaurantModel.find({}, callback);
// };

// findOne will retrieve the restaurant associated with the given id
const findOne = (id, callback) => {
  // console.log("find " + id);
  RestaurantModel.find({ place_id: id }, callback);
};

// insertOne inserts a restaurant into the db
const insertOne = (restaurant, callback) => {
  RestaurantModel.create(restaurant, callback);
};

// retrieve many restaurants
const findMany = (ids, callback) => {
  // console.log('find 6 nearby restaurants');
  RestaurantModel.find({ place_id: { $in: ids } }, callback);
};

const clearDb = (cb) => {
  RestaurantModel.remove({}, cb);
};


module.exports = {
  RestaurantModel : RestaurantModel,
  findOne : findOne,
  findAll : findAll,
  insertOne : insertOne,
  findMany : findMany,
  clearDb : clearDb
};
