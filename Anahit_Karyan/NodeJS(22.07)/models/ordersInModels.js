const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, forinKey: 'product', required: [true, 'Products array required']}],
    price: {
		type: Number,
		min: 0,
	    required: [true, 'Order price required']
    },
    quantity: {
		type: Number,
		min: 0,
	    required: [true, 'Quantity required']
    }
  }, {timestamps: true});
orderSchema.index({createdAt: 1},{expireAfterSeconds: 2592000});
const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;