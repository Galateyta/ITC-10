
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
    	type: String,
    	validate: {
	    	validator: function(v) {
	        	return /[A-Z]{1}[a-z]{1,}/.test(v);
	      	},
	      	message: props => `${props.value} is not a valid name!`
	    },
	    required: [true, 'User name required']
	    },
    age: {
		type: Number,
		min: 0,
		max: 120,
	    required: [true, 'User age required']
         },
    gender:{
        type: String,
        enum: ['male','female'],
        required: [true, 'User gender required']
    },
	orders: [{type: mongoose.Schema.Types.ObjectId, forinKey: 'order',}],
	role: {
        type: String,
        enum: ['isAdmin', 'isUser'],
        required: [true, 'Order required']
    }
  });
const Users = mongoose.model('Users', userSchema);

module.exports = Users;