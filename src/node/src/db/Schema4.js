const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  image:String,
});

const User = mongoose.model('product_delivery_details', userSchema);

module.exports = User;
