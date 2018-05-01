var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  name: String,
  place_id: { type: String, unique: true },
  google_rating: Number,
  zagat_rating: Number,
  photos: [String],
  neighborhood: String,
  price_level: Number,
  types: String,
  nearby: [String]
});

var RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

// findAll retrieves all stories
function findAll(callback) {
  console.log('finding all!');
  RestaurantModel.find({}, callback);
}

// findOne will retrieve the restaurant associated with the given id
function findOne(id, callback) {
  console.log("find " + id);
  RestaurantModel.find({place_id: id}, callback);
}

// insertOne inserts a restaurant into the db
function insertOne(restaurant, callback) {
  console.log('inserting one restaurant');
  RestaurantModel.create(restaurant, callback);
}

// retrieve many restaurants
function findMany(ids, callback) {
  console.log('find 6 nearby restaurants');
  RestaurantModel.find({place_id: {$in: ids}}, callback);
}

const clearDb = (cb) => {
  RestaurantModel.remove({}, cb)
}

exports.RestaurantModel = RestaurantModel;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.findMany = findMany;
exports.clearDb = clearDb;
