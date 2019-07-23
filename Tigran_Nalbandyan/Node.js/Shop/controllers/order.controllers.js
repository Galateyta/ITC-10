const Order = require('../models/order.models');
const Product = require('../models/product.models');

async function addOrder(req, res) {
    req.body.price = await calculatePrice(req.body);
    const newOrder = new Order(req.body);
    try {
        const data = await newOrder.save()
        if (!data) {
            res.status(404).json({
                message: "No record found"
            });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getOrders(req, res) {
    if (req.query.id) {
        try {
            const order = await Order.findById(req.query.id);
            if (!order) {
                res.status(404).json({
                    message: `Order by id ${req.query.id} not found`
                });
                return;
            }
            res.status(200).json(order);
        } catch (err) {
            res.status(404).json(err);
        }
    } else {
        try {
            const order = await Order.find({});
            if (!order) {
                res.status(404).json({
                    message: "No record found"
                });
                return;
            }
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

async function deleteOrder(req, res) {
    try {
        const data = await Order.deleteOne({
            _id: req.query.id
        });
        if (!data || !data.n) {
            res.status(404).json({
                message: `Order by id ${req.query.id} not found`
            });
            return;
        }
        res.status(200).json({
            message: `Order by id ${req.query.id} successfully deleted`
        });
    } catch (err) {
        res.status(404).json({
            message: `Order by id ${req.query.id} not found`
        });
    }
}

async function updateOrder(req, res) {
    try {
        const data = await Order.updateOne({
            _id: req.query.id
        }, req.body, {
            runValidators: true
        });
        if (!data || !data.n) {
            res.status(404).json({
                message: `Order by id ${req.query.id} not found`
            });
            return;
        }
        res.status(200).json({
            message: `Order by id ${req.query.id} successfully updated`
        });
    } catch (err) {
        res.status(404).json({
            message: `Order by id ${req.query.id} not found`
        });
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