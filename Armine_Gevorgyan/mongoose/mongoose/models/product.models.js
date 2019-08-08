const mongoose = require('../databases/mongodb.js');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowecase: true,
        minlength: [3, 'min length is 3 character'],
        required: [true, 'name can not be empty']
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'price can not be empty']
    },
    description: {
        type: String,
        trim: true,
        minlength: [3, 'min length is 3 character'],
        required: [true, 'description can not be empty']
    },
    type: {
        type: String,
        enum: ["desert", "salad", "drink"],
        required: [true, 'type can not be empty']
    },
    img: {
        type: String,
      //  required: [true, 'img can not be empty']
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
