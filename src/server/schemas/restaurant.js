const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  rating: Number,
  categories: [String],
  time: String,
  reviews: Number,
  image_url: String,
  price: String,
  id: String,
  menu_id: String,
  name: String,
  review_count: Number,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
