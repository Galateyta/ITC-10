const mongoose = require('../database/mongo');

const schema = new mongoose.Schema({
    name: {type: String, min: [3, "Minimum 3 symbols!!!"], required: true},
    age: {type: Number, min: [16, "The user must be older than 16!!!"],
            max: [100, "The user must be younger then 100!!!"], required: true},
    gender: {type: String, enum: ["male", "female", "other"],
            required: "If you can't, choose 'other')"
    },
    orders: {type: Array}
});

const user = mongoose.model('user', schema);
module.exports = user;