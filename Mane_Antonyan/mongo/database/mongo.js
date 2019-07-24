const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kolibri', {useNewUrlParser: true});
module.exports = mongoose;