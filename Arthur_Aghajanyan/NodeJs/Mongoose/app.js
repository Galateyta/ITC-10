const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routers/user.routers.js');
const order = require('./routers/order.routers.js');
const product = require('./routers/product.routers.js');

const app = express();
const port = 10000;

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use('/users', user);
app.use('/orders', order);
app.use('/products', product);

app.listen(port, () => console.log(`Shop server listening on port ${port}`));

module.exports = app; // for testing
