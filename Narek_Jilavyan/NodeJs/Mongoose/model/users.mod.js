const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var user = new Schema({
    name:  { type: String, required: true },
    age: { type: Number, min: 0, max: 99, required: true },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'order'}]
});

var User = mongoose.model('user', user);

module.exports = User;