const Order = require('../models/order.models');

function findAllOrders() {
    return Order.find({}).exec(); // get object with exec
}

function findOrdersById(id) {
    return Order.findById(id).exec();
}

function addOneOrder(order) {
    const newOrder = new Order(order);
    return newOrder.save();
}

function updateOneOrder(id, info) {
    return Order.updateOne({_id: id}, info, 
            {runValidators: true}).exec();
}

function deleteOneOrder(id) {
    return Order.deleteOne({ _id: id }).exec();
}

module.exports.findAllOrders = findAllOrders;
module.exports.findOrdersById = findOrdersById;
module.exports.addOneOrder = addOneOrder;
module.exports.updateOneOrder = updateOneOrder;
module.exports.deleteOneOrder = deleteOneOrder;