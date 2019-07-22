const mongoose = require('../databases/mongodb.js');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, 'Too short'],
        required: 'name can\'t be empty'
    },
    age: {
        type: Number,
        min: [18, 'Too young'],
        max: [45, 'Too old'],
        required: 'age can\'t be empty'
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: 'gender can\'t be empty'
    },
    orders: [mongoose.Schema.ObjectId]
});
const User = mongoose.model('User', UserSchema);
module.exports = User;