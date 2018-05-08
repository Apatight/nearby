const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://mongodb/apateez-nearby';
const mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl); // Try localhost first
// mongoose.connect(mongoUrlDocker); // Try localhost first
mongoose.connection.on('connected', () => {
  // console.log('Mongoose connection open');
});
mongoose.connection.on('error', () => {
  // console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrl);
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
const findOne = (id, callback) =>
  // console.log("find " + id);
  RestaurantModel.find({ place_id: id })
;

// insertOne inserts a restaurant into the db
const insertOne = (restaurant, callback) => RestaurantModel.create(restaurant);

// retrieve many restaurants
const findMany = (ids, callback) => RestaurantModel.find({ place_id: { $in: ids } });
const clearDb = (cb) => {
  RestaurantModel.remove({}, cb);
};


module.exports = {
  RestaurantModel,
  findOne,
  insertOne,
  findMany,
  clearDb,
};
