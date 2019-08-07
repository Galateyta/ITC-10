const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const User = mongoose.model('user', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: [7, 'Too small age'],
        max: [50, 'Too big age'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    role: {
        type: String,
        enum: ['user', 'admin']
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }]
}));

module.exports = User;