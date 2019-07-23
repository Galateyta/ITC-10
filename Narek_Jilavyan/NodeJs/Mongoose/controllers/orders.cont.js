const Order = require('../model/orders.mod');

function addOrder(order) {
    const newOrder = new Order(order);
    return newOrder.save();
}

function findOrders() {
    return Order.find({}).exec();
}

function findOrdersById(id) {
    return Order.findById(id).exec();
}

function deleteOrder(id) {
    return Order.deleteOne({
        _id: id
    }).exec();
}

function updateOrder(id, info) {
    return Order.updateOne({
        _id: id
    }, info, {runValidators: true}).exec();
}

module.exports.addOrder = addOrder;
module.exports.findOrders = findOrders;
module.exports.findOrdersById = findOrdersById;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;