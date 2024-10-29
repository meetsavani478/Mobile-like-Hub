const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
    },
    Product_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: { 
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const cartSchema = new mongoose.Schema({
    User_id: {
        type: String,
        required: true,
    },
    products: [productSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
