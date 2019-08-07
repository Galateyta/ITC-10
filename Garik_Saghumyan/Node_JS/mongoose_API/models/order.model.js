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
   
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
}, {timestamps: true}).index({createdAt: 1},{expireAfterSeconds: 2592000}));


module.exports = Order;