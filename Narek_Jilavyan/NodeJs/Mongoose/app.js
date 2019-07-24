const mongoose = require("mongoose");
const express = require("express");
const app = express();
const body_parser = require("body-parser");

const users = require("./routers/users.rout");
const products = require("./routers/products.rout");
const orders = require("./routers/orders.rout");


app.use(body_parser.urlencoded({
    extended: false
}));

app.use(body_parser.json());
mongoose.connect('mongodb://localhost:27017/Classwork', {useNewUrlParser: true});
//mongoose.set('useCreateIndex', true);
app.listen(10000);
app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);


module.exports = app;