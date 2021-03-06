const express = require('express');
const orders = require('../controlers/orders.controlers');
const checkUser = require('../middlewares/users.middleware');
const router = express.Router();

router.route('/')
    .get(checkUser.checkUser, orders.getAllOrders)
    .post(checkUser.checkUser, orders.addOrder)


router.route('/:id')
    .get(checkUser.checkUser, orders.getOrderByID)
    .put(checkUser.checkUser, orders.updateOrder)
    .delete(checkUser.checkUser, orders.removeOrder)
module.exports = router;