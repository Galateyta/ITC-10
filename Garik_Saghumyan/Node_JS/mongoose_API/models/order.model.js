const mongoose = require('mongoose');

 
const Order = mongoose.model('order', new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type:Number,
        min: 1,
        default:1
    },
    createAt: {
        type: Date,
        default: Date.now(),
        index: { expireAfterSeconds: 2592000 } 
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
}));

module.exports = Order;