const express = require('express');
const router = express.Router();
const controlellers = require('../controllers/ordersInControllers');
router.route('/')
.get(controlellers.getAllOrders)
.post(controlellers.postOrder);

router.route('/:id')
.get(controlellers.getOrderById)
.put(controlellers.putOrderById)
.delete(controlellers.deleteOrderById);

module.exports = router; 