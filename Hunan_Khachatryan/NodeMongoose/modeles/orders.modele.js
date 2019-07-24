const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var orderSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }

}, {
    timestamps: true
});

orderSchema.index({
    createdAt: 1
}, {
    expireAfterSeconds: 2592000
})

var Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;