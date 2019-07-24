const orders = require("../controllers/order.controllers");
const mid = require("../middlewere");
const express = require("express");
const router = express.Router();



router.route('/')
.get(orders.findOrder)
.post(mid.isUserExist, orders.addOrder)
.delete(orders.deleteOrder)
.put(orders.updateOrder);

module.exports = router;