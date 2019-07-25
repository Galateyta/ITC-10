const Order = require('../models/order.models');
const product = require('../models/product.models');
const User = require('../models/user.models');
const log = require('../config/index');


async function addOrder(req, res) {
    req.body.price = await getPrice(req.body);
    const newOrder = new Order(req.body);
    try {
        const data = await newOrder.save();

        if (!data) {
            res.status(404).json({
                message: `No record found`
            })
            return
        }
        const dataId = data.id;
        const userId = req.headers.authorization;
        const update = {
            $push: {
                orders: dataId
            }
        }
        await User.updateOne({
            _id: userId
        }, update, {
            runValidators: true
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function findOrders(req, res) {

    if (req.query.id) {
        try {
            const order = await Order.findById(req.query.id)
            if (!order) {
                log.error({'statusCode': 404},'could not find orders')
                res.status(404).json({
                    message: `No record found`
                })
                return
            }
            log.info({'statusCode': res.statusCode},'successfuled findById orders')
            res.status(200).json(order);

        } catch (err) {
            log.error({'statusCode': 400},'could not find orders')
            res.status(400).json(err);
        }
    } else {
        try {
            const order = await Order.find({})
            if (!order) {
                res.status(404).json({
                    message: `No record found`
                })
                return
            }
            res.status(200).json(order);
            log.info({'statusCode': res.statusCode},'successfuled find orders')

        } catch (err) {
            log.error({'statusCode': 400},'could not find orders')
            res.status(400).json(err);
        }
    }
}

async function deleteOrder(req, res) {
    try {
        const data = await Order.deleteOne({
            _id: req.query.id
        })
        if (!data.n) {
            res.status(404).json({
                message: `Order not found`
            });
        }
        const dataId = req.query.id;
        const userId = req.headers.authorization;
        const update = {
            $pull: {
                orders: dataId
            }
        }
        await User.updateOne({
            _id: userId
        }, update, {
            runValidators: true
        });
        res.status(200).json({
            message: `Order by id ${req.query.id} successfully deleted`
        })

    } catch (err) {
        res.status(400).json(err);
    };

}

async function updateOrder(req, res) {
    try {
        const inputOrder = req.body;

        if (!inputOrder.quantity || !inputOrder.products) {
            const oldOrder = await Order.findById(req.query.id);

            if (!inputOrder.products) {
                inputOrder.products = oldOrder.products;
            }
            if (!inputOrder.quantity) {
                inputOrder.quantity = oldOrder.quantity;
            }
        }
        inputOrder.price = await getPrice(inputOrder);

        const data = await Order.updateOne({
            _id: req.query.id
        }, {
            products: inputOrder.products,
            quantity: inputOrder.quantity,
            price: inputOrder.price
        }, {
            runValidators: true
        })
        if (!data.n) {
            res.status(404).json({
                message: `Order not found`
            });
        }
        res.status(200).json({
            message: `Order by id ${req.query.id} successfully updated`
        });

    } catch (err) {
        res.status(400).json(err);
    };
}

async function getPrice(order) {
    let priceCount = 0;
    for (productId of order.products) {
        await product.findById(productId).exec().then((result) => {
            priceCount += result.price;
        })
    }
    return priceCount * order.quantity;
}


module.exports.addOrder = addOrder;
module.exports.findOrders = findOrders;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;
