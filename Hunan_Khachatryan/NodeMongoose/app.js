const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routers/users.router');
const orders = require('./routers/orders.router');
const products = require('./routers/products.router');
const app = express();
const server = http.createServer(app);
require('dotenv').config();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.use('/users', users);
app.use('/products', products)
app.use('/orders', orders)


server.listen(process.env.PORT);

module.exports.app = app;