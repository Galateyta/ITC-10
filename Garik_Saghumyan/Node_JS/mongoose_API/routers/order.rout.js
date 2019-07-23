const express = require('express');
const app = express();
const controller = require('../controllers/order.controller');
const checkUser = require('../middlewares/checkUser')
app.route('/')
    .get(controller.orderGetFunction)
    .post(checkUser, controller.orderPostFunction)
    .put(controller.updateOrder)
app.route('/:id')
    .get(controller.orderGetById)
    .delete(controller.orderDeleteById)
module.exports = app;