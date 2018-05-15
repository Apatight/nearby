require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/apateez-nearby';
const mongoUrlDocker = 'mongodb://MONGO_USER:MONGO_PASS@54.241.128.139:27017/admin';


mongoose.connect(mongoUrlDocker); // Try localhost first
// mongoose.connect(mongoUrl); // Try localhost first
mongoose.connection.on('connected', () => {
});
mongoose.connection.on('error', () => {
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

const findOne = id => RestaurantModel.find({ place_id: id });

const insertOne = restaurant => RestaurantModel.create(restaurant);

const findMany = (ids) => RestaurantModel.find({ place_id: { $in: ids } });

const clearDb = () => RestaurantModel.remove({});


module.exports = {
  RestaurantModel,
  findOne,
  insertOne,
  findMany,
  clearDb,
};
