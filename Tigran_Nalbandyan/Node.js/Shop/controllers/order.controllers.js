const Order = require('../models/order.models');
const Product = require('../models/product.models');
const User = require('../models/user.models.js');
const logger = require('../logging/logger.js');

async function addOrder(req, res) {
    logger.log('debug', `POST /orders ${JSON.stringify(req.body)}`);
    req.body.price = await calculatePrice(req.body);
    const newOrder = new Order(req.body);
    try {
        const data = await newOrder.save()
        if (!data) {
            logger.log('debug', `res /orders 404`);
            logger.log('debug', `res /orders No record found`);
    
            res.status(404).json({
                message: "No record found"
            });
            return;
        }
        const token = req.headers.authorization;

        const update = {
            $push: {
                orders: data.id
            }
        }
        await User.updateOne({_id: token}, update, {runValidators: true});
    
        logger.log('debug', `res /orders 200`);
        logger.log('debug', `res /orders ${JSON.stringify(data)}`);

        res.status(200).json(data);
    } catch (err) {
        logger.log('err', `res /orders ${JSON.stringify(err)}`);
        res.status(400).json(err);
    }
}

async function getOrders(req, res) {
    logger.log('debug', `GET /orders ${JSON.stringify(req.body)}`);

    if (req.query.id) {
        try {
            const order = await Order.findById(req.query.id);
            if (!order) {
                logger.log('debug', `res /orders 404`);
                logger.log('debug', `res /orders Order by id ${req.query.id} not found`);
        
                res.status(404).json({
                    message: `Order by id ${req.query.id} not found`
                });
                return;
            }
            
            logger.log('debug', `res /orders 200`);
            logger.log('debug', `res /orders ${JSON.stringify(order)}`);

            res.status(200).json(order);
        } catch (err) {
            res.status(404).json(err);
        }
    } else {
        try {
            const order = await Order.find({});
            if (!order) {
                logger.log('debug', `res /orders 404`);
                logger.log('debug', `res /orders Order by id ${req.query.id} not found`);
        
                res.status(404).json({
                    message: "No record found"
                });
                return;
            }

            logger.log('debug', `res /orders 200`);
            logger.log('debug', `res /orders ${JSON.stringify(order)}`);

            res.status(200).json(order);
        } catch (err) {
            logger.log('err', `res /orders ${JSON.stringify(err)}`);
            res.status(400).json(err);
        }
    }
}

async function deleteOrder(req, res) {
    logger.log('debug', `DELETE /orders ${JSON.stringify(req.body)}`);

    try {
        const data = await Order.deleteOne({
            _id: req.query.id
        });
        if (!data || !data.n) {
            logger.log('debug', `res /orders 404`);
            logger.log('debug', `res /orders Order by id ${req.query.id} not found`);
    
            res.status(404).json({
                message: `Order by id ${req.query.id} not found`
            });
            return;
        }
        const token = req.headers.authorization;

        const update = {
            $pull: {
                orders: req.query.id
            }
        }
        await User.updateOne({_id: token}, update, {runValidators: true});

        logger.log('debug', `res /orders 200`);
        logger.log('debug', `res /orders Order by id ${req.query.id} successfully deleted`);

        res.status(200).json({
            message: `Order by id ${req.query.id} successfully deleted`
        });
    } catch (err) {
        logger.log('err', `res /orders ${JSON.stringify(err)}`);
        res.status(404).json({
            message: `Order by id ${req.query.id} not found`
        });
    }
}

async function updateOrder(req, res) {
    logger.log('debug', `UPDATE /orders ${JSON.stringify(req.body)}`);

    try {
        const newOrder = req.body

        if (!newOrder.quantity || !newOrder.products) {
            const order = await Order.findById(req.query.id);
            if (!newOrder.products) {
                newOrder.products = order.products;
            }
            if (!newOrder.quantity) {
                newOrder.quantity = order.quantity;
            }
        }

        newOrder.price = await calculatePrice(newOrder);

        const data = await Order.updateOne({
            _id: req.query.id
        }, {
            products: newOrder.products,
            quantity: newOrder.quantity,
            price: newOrder.price
        }, {
            runValidators: true
        });
        if (!data || !data.n) {
            logger.log('debug', `res /orders 404`);
            logger.log('debug', `res /orders Order by id ${req.query.id} not found`);
    
            res.status(404).json({
                message: `Order by id ${req.query.id} not found`
            });
            return;
        }

        logger.log('debug', `res /orders 200`);
        logger.log('debug', `res /orders Order by id ${req.query.id} successfully updated`);

        res.status(200).json({
            message: `Order by id ${req.query.id} successfully updated`
        });
    } catch (err) {
        logger.log('err', `res /orders ${JSON.stringify(err)}`);
        console.log(err);
        res.status(404).json(err);
    }
}

async function calculatePrice(order) {
    let totalPrice = 0;
    for (productId of order.products) {
        const product = await Product.findById(productId);
        totalPrice += product.price;
    }
    totalPrice *= order.quantity;
    return totalPrice;
}

module.exports.addOrder = addOrder;
module.exports.getOrders = getOrders;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;