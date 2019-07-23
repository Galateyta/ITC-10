const orders = require('../controllers/order.controllers.js');
const checks = require('../middlewares/check.js');
const express = require('express');

const router = express.Router();
router.route('/')
    .get(checks.checkUser, orders.getOrders)
    .post(checks.checkUser, orders.addOrder)
    .delete(checks.checkUser, orders.deleteOrder)
    .put(checks.checkUser, orders.updateOrder);

module.exports = router;