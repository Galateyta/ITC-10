const mongoose = require('mongoose');
const express = require('express');
const users = require('./routers/user.rout');
const orders = require('./routers/order.rout');
const products = require('./routers/product.rout');
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/'+ process.env.DB_NAME , {useNewUrlParser: true});
app.listen(10000);
app.use('/users' , users);
app.use('/orders', orders);
app.use('/products', products);
module.exports = app;
