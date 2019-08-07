const mongoose = require('../databases/mongodb.js');

const OrderSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: 'price can\'t be empty',
        min: 0
    },
    quantity: {
        type: Number,
        required: 'quantity can\'t be empty',
        min: 1,
        default: 1
    },
    products: {
        type: [mongoose.Schema.ObjectId],
        required: 'products can\'t be empty'
    },
}, {timestamps: true});
OrderSchema.index({createdAt: 1},{expireAfterSeconds: 2592000 /* 30 days in seconds */});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;