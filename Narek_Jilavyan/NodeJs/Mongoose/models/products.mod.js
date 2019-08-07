let mongoose = require("mongoose");
const Schema = mongoose.Schema;

var product = new Schema({
    name:  { 
        type: String, 
        validate:{
            validator: function(v) {
                return /[A-Z]{1}[a-z]{1,}/.test(v);
            },
            message: (props) => `${props.value} is not valid name`
        },
        required: true },
    price: { type: Number, min: 0, required: [true, "product's price is required"]},
    description:  String,
    type : {
        type: String,
        enum: ["desert", "salad", "drink"],
        required: [true, "product's type is required"]
    },
    img: String
});

var Product = mongoose.model('products', product);

module.exports = Product;