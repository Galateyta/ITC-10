const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var order = new Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: [true, "Order's products is required."] }],
    price: { type: Number, min: 0, required: [true, "Order's price is required."]},
    quantity : { type: Number, min: 0, required: [true, "Order's product's quantity is required."] },
});

var Order = mongoose.model('orders', order);

module.exports = Order;