const mongoose = require("../database/mongo");
const logger = require("../app");

const schema = new mongoose.Schema({
    price: {type: Number, required: true, min: 1},
    quantity: {type: Number, required: true},
    products: {type: Array}
});

schema.index({createdAt: 1}, { expireAt : 
        {type: Date, default: Date.now,
        index: { expires: "30d" }}});

const order = mongoose.model("order", schema);
module.exports = order;