const mongoose = require('mongoose');

 
const Order = mongoose.model('order', new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: Number,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
}));

module.exports = Order;