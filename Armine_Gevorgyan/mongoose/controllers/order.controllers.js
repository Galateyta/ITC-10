const Order = require('../models/order.models');
const products = require('../controllers/product.controllers.js');

function addOrder(order) {

  let finallyPrice = 0;
  for(let i = 0; i < order.products.length; ++i) {
    products.findProductsById(order.products[i]).then((data, err) => {
        if (data.length == 0) {
            console.log("Not found")
            return
        }
        finallyPrice = Number(order.quantity * data.price)+ finallyPrice;
        console.log(finallyPrice);
    })
    .catch((err) => {
        console.log(`Product by id ${order.products[i]} not found`);
        return
    });


  }
  setTimeout(function() {
      order.price = finallyPrice;
      const newOrder = new Order(order);
      return newOrder.save(); }, order.products.length * 500);

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
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;
module.exports.findOrdersById = findOrdersById;
