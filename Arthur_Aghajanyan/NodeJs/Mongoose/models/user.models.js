const mongoose = require('../databases/mongodb.js');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, 'Too short'],
        required: 'name can\'t be empty'
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: 'role can\'t be empty'
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
    orders: [{type : mongoose.Schema.Types.ObjectId,ref :'orders'}]
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
