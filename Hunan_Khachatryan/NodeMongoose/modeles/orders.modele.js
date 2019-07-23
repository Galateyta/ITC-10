const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for opders

var orderSchema = new Schema({
    products: [{type : mongoose.Schema.Types.ObjectId ,ref :'products'}],
    price: { type: Number},
    quantity : {type : Number}
});
var Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;