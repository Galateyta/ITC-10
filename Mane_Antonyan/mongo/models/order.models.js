const mongoose = require("../database/mongo");

const schema = new mongoose.Schema({
    price: {type: Number, required: true, min: 1},
    quantity: {type: Number, required: true},
    products: {type: Array}
});

const order = mongoose.model("order", schema);
module.exports = order;