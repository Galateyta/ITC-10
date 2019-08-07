const express = require('express');
const app = express();
const controller = require('../controllers/product.controller');
const chekAdmin = require('../middlewares/checkAdmin');

app.route('/')
    .get(controller.productGetFunction)
    .post(chekAdmin, controller.productPostFunction)
    .put(controller.updateProduct)
app.route('/:id')
    .get(controller.productGetById)
    .delete(controller.productDeleteById)
module.exports = app;