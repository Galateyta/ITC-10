const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema for user
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["admin"]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }]
});
var Users = mongoose.model('users', userSchema);
module.exports = Users;