const mongoose = require('mongoose');


const Product = mongoose.model('product', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: ['desert', 'salad', 'drink', ],
        required: true
    },
    img: String
}));

module.exports = Product;