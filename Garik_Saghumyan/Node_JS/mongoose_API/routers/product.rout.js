const express = require('express');
const app = express();
const controller = require('../controllers/product.controller');

app.route('/')
    .get(controller.productGetFunction)
    .post(controller.productPostFunction)
    .put(controller.updateProduct)
app.route('/:id')
    .get(controller.productGetById)
    .delete(controller.productDeleteById)
module.exports = app;