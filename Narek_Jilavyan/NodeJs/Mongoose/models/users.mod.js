const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var user = new Schema({
    name:  { 
        type: String,
        validate:{
            validator: function(v) {
                return /[A-Z]{1}[a-z]{1,}/.test(v);
            },
            message: (props) => `${props.value} is not valid name`
        },
        required: [true, "User's name is required."] 
    },
    age: { type: Number, min: 0, max: 120, required: [true, "User's age is required."]},
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "User's gender is required."]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: [true, "User's role is required."]
    },
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'order'}]
});

var User = mongoose.model('users', user);

module.exports = User;