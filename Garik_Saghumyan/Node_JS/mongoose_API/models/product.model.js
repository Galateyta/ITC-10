const mongoose = require('mongoose');


const Product = mongoose.model('product', new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    type: {
        type: String,
        enum: ['desert', 'salad', 'drink',]
    },
    img: String
}));

module.exports = Product;