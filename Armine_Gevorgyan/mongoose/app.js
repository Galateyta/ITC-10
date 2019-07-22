const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routers/user.routers.js');
const order = require('./routers/order.routers.js');
const product = require('./routers/product.routers.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/users', user);
app.use('/orders', order);
app.use('/products', product);


console.log("Server Run");
app.listen(12345);

module.exports = app; // for testing
