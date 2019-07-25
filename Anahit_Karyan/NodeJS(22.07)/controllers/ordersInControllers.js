const Order = require('../models/ordersInModels')
const Product = require('../models/productsInModels')
const User =  require('../models/usersInModels.js');

module.exports.getAllOrders = async function(req, res){    
    try {
        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    } 
}

module.exports.postOrder = async function (req, res) {
    if(!req.body) return res.sendStatus(400);
    let productsSum = 0;
    
    for (let i = 0; i < req.body.products.length; ++i) {
        const id = req.body.products[i];
        try {
            const product = await Product.findOne({_id: id});
            productsSum = productsSum + product.price;

        } catch (error) {
            console.error(error)
            return res.status(400).json({message: `product with ${id} id doesn't exist`});
        }
        
    }

    const price = productsSum * Number(req.body.quantity);
    console.log("price",price);console.log("productsum",productsSum);
    const order = new Order({products: req.body.products, price: price, quantity: req.body.quantity});
    try {
        const result = await order.save();
        const user = await User.findOne({_id: req.headers.authorization});
        user.orders.push(order.id);
        user.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports.getOrderById = async function(req, res){        
    const id = req.params.id;
    try {
        const order = await Order.findOne({_id: id});
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.putOrderById = async function(req, res){
    if(!req.body) return res.sendStatus(400);
    let productsSum = 0;
    let price;
    const id = req.params.id;
    let products;
    let quantity;
    try {
        const order0 = await Order.findOne({_id: id});
        req.body.products ? products = req.body.products : products = order0.products;
        req.body.quantity ? quantity = req.body.quantity : quantity = order0.quantity;
        if(req.body.products || req.body.quantity) {
            for (let i = 0; i < products.length; ++i) {
                const id = products[i];
                try {
                    const product = await Product.findOne({_id: id});
                    productsSum = productsSum + product.price;

                } catch (error) {
                    console.error(error)
                    return res.status(400).json({message: `product with ${id} id doesn't exist`});
                }  
            }
            price = productsSum * Number(quantity);
        }
        const order = await Order.findOneAndUpdate({_id: id}, {products, quantity, price} , {new: true});
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    }
    
}

module.exports.deleteOrderById = async function(req, res){ 
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(id);
        const user = await User.findOne({_id: req.headers.authorization});
        const index = user.orders.indexOf(req.headers.authorization);
        user.orders.splice(index, 1);
        user.save();
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    }
}