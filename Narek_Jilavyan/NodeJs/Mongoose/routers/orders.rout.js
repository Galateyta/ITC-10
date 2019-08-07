const ordersMid = require('../middlewares/orders.mid');
const orders = require('../controllers/orders.cont');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(orders.getOrders)
    .post(ordersMid.checkUser, orders.addOrder)
    router.put('/:id', orders.updateOrder)
    router.delete('/:id', orders.deleteOrder)
    router.get('/:id', orders.getOrder)

module.exports = router;