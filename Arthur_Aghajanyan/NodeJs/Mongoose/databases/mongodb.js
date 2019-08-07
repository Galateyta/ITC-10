const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

let con = 'mongodb://'+process.env.IP+':'+process.env.PORT+'/'+process.env.COLLECTION;

mongoose.connect(con, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
module.exports = mongoose;
