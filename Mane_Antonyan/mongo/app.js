const express = require('express');
const bodyParser = require('body-parser');

const order = require("./routers/order.routers");
const product = require("./routers/product.routers");
const user = require("./routers/user.routers");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/orders', order);
app.use('/products', product);
app.use('/users', user);

app.listen(port, () => console.log("Listening port: " + port));