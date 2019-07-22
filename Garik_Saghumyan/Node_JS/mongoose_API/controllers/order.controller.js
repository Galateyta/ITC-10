const Order = require('../models/order.model');
let orderPostFunction =  function(req, res){
    if(!req.body) return res.sendStatus(400);
    const orderPrice = req.body.price;
    const orderQuantity = req.body.quantity;
    const orderProducts = req.body.products;
    const order = new Order({price: orderPrice, quantity: orderQuantity, products: orderProducts});
    console.log(order);
        
    order.save().then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
}
let orderGetFunction = function(req, res){
    Order.find({}).then((result) => {
        res.send(result)
    }).catch((reject) => {
        console.log(reject)
    });
}
let orderGetById = function(req, res){     
    const id = req.params.id;
    Order.findOne({_id: id}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
}
let orderDeleteById =  function(req, res){     
    const id = req.params.id;
    Order.findByIdAndDelete(id).then((result) => {
        res.send(result)
    }).catch((reject) => {
        console.log(reject);
    });
};
let updateOrder = function(req, res){
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const orderPrice = req.body.price;
    const orderQuantity = req.body.quantity;
    const newOrder = {price: orderPrice, quantity: orderQuantity};
    Order.findOneAndUpdate({_id: id}, newOrder, {new: true}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
};
module.exports.orderPostFunction = orderPostFunction;
module.exports.orderGetFunction = orderGetFunction;
module.exports.updateOrder = updateOrder;
module.exports.orderDeleteById = orderDeleteById;
module.exports.orderGetById = orderGetById;


