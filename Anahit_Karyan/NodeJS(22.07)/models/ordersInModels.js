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
  });
const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;