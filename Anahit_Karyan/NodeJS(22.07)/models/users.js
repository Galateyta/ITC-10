
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender:{
        type: String,
        enum: ['male','female']
    },
    orders: [{type: mongoose.Schema.Types.ObjectId, forinKey: 'order'}]
  });
const Users = mongoose.model('Users', userSchema);

module.exports = Users;