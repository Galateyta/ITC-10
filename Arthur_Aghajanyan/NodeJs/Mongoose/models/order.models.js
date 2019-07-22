const mongoose = require('../databases/mongodb.js');

const OrderSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: 'price can\'t be empty',
        min: 1
    },
    quantity: {
        type: Number,
        required: 'quantity can\'t be empty',
        min: 1
    },
    products: [mongoose.Schema.ObjectId]
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;