const Order = require('../models/orders.mod');
const User = require('../models/users.mod');
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
        var newOrder = new Order({products: req.body.products, price: newPrice, quantity: req.body.quantity});
        result = await newOrder.save();
    
        await User.updateOne({_id: req.headers.authorezation},{$push: {orders: result._id}});
        
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }
}

async function updateOrder(req, res){
    try {
        if(!(req.body.quantity || req.body.products)){
            res.status(400).json({"error": "invalid body"});
            return;    
        }

        const data = await Order.findById(req.params.id);
        if (data.length == 0) {
            res.status(400).json({"error" : "invalid order"});
            return;
        }
        
        newProducts = req.body.products || data.products;
        quantity = req.body.quantity || data.quantity;

        let newPrice = 0;

        for (const product of newProducts) {
            const data = await Product.findById(product);
            if (data.length != 0) {
                newPrice += data.price;            
            }
            else{
                continue;
            }
        } 

        let result;

        newPrice *= quantity;
        result = await Order.updateOne({ _id: req.params.id}, {products: newProducts, price: newPrice, quantity: quantity} , {runValidators: true}).exec();
        
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }  
}

async function deleteOrder(req, res){
    try {
        await User.updateOne({_id: req.headers.authorezation},{$pull: {orders: req.params._id}});
        result = await Order.deleteOne({_id: req.params.id})
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid order"});
    } 
}

module.exports.addOrder = addOrder;
module.exports.getOrders = getOrders;
module.exports.getOrder = getOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.updateOrder = updateOrder;