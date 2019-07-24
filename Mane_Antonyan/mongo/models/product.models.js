const mongoose = require('../database/mongo');

const schema = new mongoose.Schema({
    name: {type: String, min: [3, "Minimum 3 symbols!"], required: true},
    price: {type: Number, min: 1, required: true},
    description: {type: String, min: [10, "Minimum 10 symbols!"]},
    type: {type: String, enum: ["Desert", "Salad", "Drink"], required: true},
    img: { type: String}
});

schema.path('img').validate((val) => {
    urlReg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlReg.test(val);
}, "Invalid URL.");

const product = mongoose.model('product', schema);
module.exports = product;