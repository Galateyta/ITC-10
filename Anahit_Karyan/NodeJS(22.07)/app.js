const express = require('express');
const app = express();
const users = require('./routers/usersAPI.js');
const products = require('./routers/productsAPI.js');
const orders = require('./routers/ordersAPI.js');
const mongoose = require('mongoose');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

app.use('/users', users);
app.use('/products', products );
app.use('/orders', orders);

app.listen(8094);
module.exports.app = app;