const express = require('express');
const Order = require('../models/order.models');
const Product = require('../models/product.models');

 async function addOrder(req, res) {
  try {
    let finallyPrice = 0;
    for(let i = 0; i < req.body.products.length; ++i) {
      const id = req.body.products[i];
        let result = await Product.findById(id);
        finallyPrice = Number(req.body.quantity * result.price) + finallyPrice;
        req.body.price = finallyPrice;
    }
    const newOrder = new Order(req.body);
    let obj = await newOrder.save();
    res.json(obj);

  } catch (error) {
    res.status(400).json(error);
    res.send(error)
  }
}

async function findOrders(req, res) {
  const id = req.query.id;
  try {
    let result = await Order.find({})
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function findOrdersById(req, res) {
  const id = req.query.id;
  try {
    let result = await Order.findById(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function deleteOrder(req, res) {
  const id = req.query.id;
  try {
    const result = await Order.deleteOne({
       _id: id
   })
   res.json(result);
 } catch (error) {
   res.status(400).json(error);
  }

}

async function updateOrder(req, res) {
  const id = req.query.id;
  const info = req.body;
  try {
    let result = Order.updateOne({
        _id: id
    }, info, {runValidators: true});
    res.json(result);
  } catch (e) {
    res.status(400).json(error);
  }
}

module.exports.addOrder = addOrder;
module.exports.findOrders = findOrders;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;
module.exports.findOrdersById = findOrdersById;
