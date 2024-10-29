const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,  
  },
  price: {
    type: Number,
    required: true,
  },
  TOtal_price: {
    type: Number,
    required: true,
  },
  quantities: {
    type: Number,
    required: true,
  },
  order_date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
