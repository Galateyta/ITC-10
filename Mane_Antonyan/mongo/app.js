const express = require('express');
const bodyParser = require('body-parser');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = "debug";

const order = require("./routers/order.routers");
const product = require("./routers/product.routers");
const user = require("./routers/user.routers");
const connection = require("./mongo.config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/orders', order);
app.use('/products', product);
app.use('/users', user);
// logger.error("Listenning");
app.listen(connection.sPort, () => console.log("Listening port: " + connection.sPort));
logger.debug("Connect server...");