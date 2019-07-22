const mongoose = require('mongoose');
const express = require('express');
const users = require('./routers/user.rout');
const orders = require('./routers/order.rout');
const products = require('./routers/product.rout');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
app.listen(10000);
app.use('/users' , users);
app.use('/orders', orders);
app.use('/products', products);

module.exports = app;
