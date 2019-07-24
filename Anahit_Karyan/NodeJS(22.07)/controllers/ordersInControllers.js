const Order = require('../models/ordersInModels')
const Product = require('../models/productsInModels')

module.exports.getAllOrders = async function(req, res){    
    try {
        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    } 
}

module.exports.postOrder = async function (req, res) {console.log('aaaaaaaaaa');
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
    const id = req.params.id;
    try {
        const order = await Order.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    }
    
}

module.exports.deleteOrderById = async function(req, res){ 
    const id = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    }
}