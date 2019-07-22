const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

 
const User = mongoose.model('user', new mongoose.Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }]
}));

module.exports = User;
