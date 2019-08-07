const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
    	type: String,
	    required: [true, 'Product name required']
	},
    price: {
		type: Number,
		min: 0,
	    required: [true, 'Product price required']
    },
    description:{
        type: String
    },
    type: {
        type: String,
        enum: ['desert','salad', 'drink']
    },
    img:  {
        type: String
    }
  });
const Products = mongoose.model('Products', productSchema);

module.exports = Products;