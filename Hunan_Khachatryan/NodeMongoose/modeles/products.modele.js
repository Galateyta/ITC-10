const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema;

// create a schema for Products

var productSchema = new Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    discription : {type: String,required: true},
    type: {type:String, enum: ["desert", "salad", "drink"]},
    img: {type: mongoose.SchemaTypes.Url}
});
var Products = mongoose.model('products', productSchema);

module.exports = Products;
