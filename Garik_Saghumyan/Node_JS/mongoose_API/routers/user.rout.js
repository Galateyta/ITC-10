const express = require('express');
const app = express();
const controller = require('../controllers/user.controller');

app.route('/')
    .get(controller.userGetFunction)
    .post(controller.userPostFunction)
    .put(controller.updateUser)
app.route('/:id')
    .get(controller.userGetById)
    .delete(controller.userDeleteById)
module.exports = app;