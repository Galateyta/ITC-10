const mongoose = require('../databases/mongodb.js');
const ObjectId = mongoose.Schema.ObjectId;
const OrderSchema = new mongoose.Schema({
    price: {
        type: Number,
        min: 0
    },
    quantity: {
        type: Number,
        required: [true, 'quantity can not be empty'],
        min: 1
    },
    products: [{ type : ObjectId, ref: 'Product' }]
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
