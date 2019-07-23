const Order = require('../models/order.model');
const Product = require('../models/product.model');
let orderPostFunction = async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const orderQuantity = req.body.quantity;
    const orderProducts = req.body.products;
    let orderPrice = 0;
    for (const productId of orderProducts) {
        const product = await Product.findOne({ _id: productId });
        orderPrice += product.price;
    }

    const order = new Order({ price: orderPrice, quantity: orderQuantity, products: orderProducts });
    try {
        const result = await order.save();
        res.send(result);
    } catch (error) {
        res.status(422).json({message: error.message});
    }
}
let orderGetFunction = async function (req, res) {
    try {
        const result = await Order.find({});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Orders not found!'});
    };
}
let orderGetById = async function (req, res) {
    const id = req.params.id;
    try {
        const result = await Order.findOne({ _id: id });
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Order not found!'});
    };
}
let orderDeleteById = async function (req, res) {
    const id = req.params.id;
    try {
        const result = await Order.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Order not found!'});
    };
};
let updateOrder = async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const orderPrice = req.body.price;
    const orderQuantity = req.body.quantity;
    const orderProducts = req.body.products;
    const newOrder = { price: orderPrice, quantity: orderQuantity, products: orderProducts };
    try {
        const result = findOneAndUpdate({ _id: id }, newOrder, { new: true });
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Order not found!'});
    };
};
module.exports.orderPostFunction = orderPostFunction;
module.exports.orderGetFunction = orderGetFunction;
module.exports.updateOrder = updateOrder;
module.exports.orderDeleteById = orderDeleteById;
module.exports.orderGetById = orderGetById;


