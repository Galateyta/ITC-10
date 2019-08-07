const mongoose = require('../databases/mongodb.js');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, 'Too short'],
        required: 'name can\'t be empty'
    },
    price: {
        type: Number,
        min: 0,
        required: 'price can\'t be empty'
    },
    description: {
        type: String,
        min: [5, 'Too short'],
        required: 'description can\'t be empty'
    },
    type: {
        type: String,
        enum: ["desert", "salad", "drink"],
        required: 'type can\'t be empty'
    },
    img: {
        type: String,
        required: 'img can\'t be empty'
    }
});
ProductSchema.path('img').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;