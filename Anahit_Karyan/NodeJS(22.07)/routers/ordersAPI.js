const express = require('express');
const router = express.Router();
const controlellers = require('../controllers/ordersInControllers');
const Middlewares = require('../middlewares/isUserMiddlewares');

router.route('/')
.get(controlellers.getAllOrders)
.post(Middlewares.isUserMiddleware, controlellers.postOrder);

router.route('/:id')
.get(controlellers.getOrderById)
.put(Middlewares.isUserMiddleware, controlellers.putOrderById)
.delete(Middlewares.isUserMiddleware, controlellers.deleteOrderById);

module.exports = router; 