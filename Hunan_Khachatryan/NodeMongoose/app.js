const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const server = http.createServer(app); 
const users = require('./routers/users.router');
const products = require('./routers/products.router');
const orders = require('./routers/orders.router');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/users',users);
app.use('/products',products)
app.use('/orders', orders)

  
  server.listen(8080);
  module.exports.app = app;