let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var product = new Schema({
    name:  { type: String, required: true },
    price: { type: Number, required: true },
    description:  String,
    type : {
        type: String,
        enum: ["desert", "salad", "drink"],
        required: true
    },
    img: String
});

var Product = mongoose.model('product', product);

module.exports = Product;