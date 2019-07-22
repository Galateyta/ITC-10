const express = require('express');
const app = express();
const controller = require('../controllers/order.controller');

app.route('/')
    .get(controller.orderGetFunction)
    .post(controller.orderPostFunction)
    .put(controller.updateOrder)
app.route('/:id')
    .get(controller.orderGetById)
    .delete(controller.orderDeleteById)
module.exports = app;