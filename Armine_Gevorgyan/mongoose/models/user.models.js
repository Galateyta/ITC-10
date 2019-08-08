const mongoose = require('../databases/mongodb.js');
const Schema = mongoose.Schema();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowecase: true,
        minlength: [3, 'min length is 3 character'],
        required: [true, 'name can not be empty'],
    },
    age: {
        type: Number,
        min: [6, 'You are small'],
        max: [90, 'You are old'],
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    orders: [mongoose.Schema.ObjectId]
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
