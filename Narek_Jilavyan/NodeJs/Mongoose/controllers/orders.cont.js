const Order = require('../models/orders.mod');
const Product = require('../models/products.mod');

async function getOrders(req, res){
    try {
        const data = await Order.find({});
        if (data.length == 0) {
            res.status(200).json({"result" : "data is empty"});
            return
        }
        res.send(data);
    }
    catch{
        res.status(400).json({"error" : "Invalid request"});
    }
}

async function getOrder(req, res){
    try {
        const data = await Order.findById(req.params.id);
        if (data.length == 0) {
            res.status(200).json({"result" : "data is empty"});
            return
        }
        res.send(data);
    }
    catch{
                res.status(400).json({"error" : "Invalid request"});
    }
}

async function addOrder(req, res){
    try {
    
        var newPrice = 0;

        for( var a = 0; a < req.body.products.length; a++){
            try {
                const data = await Product.findById(req.body.products[a]);
                if (data.length != 0) {
                    newPrice += data.price;            
                }
            }
            catch {
            }
        }
    
        newPrice *= req.body.quantity;

        req.body.price = newPrice;

        var newOrder = new Order(req.body);
        result = await newOrder.save();
    
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }
}

async function updateOrder(req, res){
    try {
        result = await Order.updateOne({ _id: req.params.id}, req.body , {runValidators: true}).exec();
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }  
}

async function deleteOrder(req, res){
    try {
        result = await Order.deleteOne({_id: req.params.id})
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    } 
}

module.exports.addOrder = addOrder;
module.exports.getOrders = getOrders;
module.exports.getOrder = getOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;