const orders = require('../controllers/order.controllers.js');
const express = require('express');
const mid = require('../middlwares/middlwares.js')

const router = express.Router();

router.route('/')
    .get(orders.findOrders)
    .post(mid.checkUser,orders.addOrder)
    .delete(mid.checkUser,orders.deleteOrder)
    .put(mid.checkUser,orders.updateOrder)

module.exports = router;
