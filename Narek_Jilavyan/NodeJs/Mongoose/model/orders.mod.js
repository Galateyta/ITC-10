const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var order = new Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    price: { type: Number, required: true },
    quantity : { type: Number, required: true },
});

var Order = mongoose.model('order', order);

module.exports = Order;