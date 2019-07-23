const Order = require('../models/ordersInModels')
const Product = require('../models/productsInModels')

module.exports.getAllOrders = function(req, res){      
    Order.find({}, function(err, order){
        if(err) return res.status(400).json(err);
        res.status(200).json(order)
    });
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
            res.status(400).json(error)
        }
        
    }

    const price = productsSum * Number(req.body.quantity); console.log("price",price);console.log("productsum",productsSum);
    const order = new Order({products: req.body.products, price: price, quantity: req.body.quantity});
    try {
        const result = await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(err);
    }
}

module.exports.getOrderById = function(req, res){
         
    const id = req.params.id;
    Order.findOne({_id: id}, function(err, order){
          
        if(err) return res.status(400).json(err);
        res.status(200).json(order);
    });
}

module.exports.putOrderById = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    Order.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, order){    
        if(err) return res.status(400).json(err);
        res.status(200).json(order);
    });
}

module.exports.deleteOrderById = function(req, res){
         
    const id = req.params.id;
    Order.findByIdAndDelete(id, function(err, order){
                
        if(err) return res.status(400).json(err);
        res.status(200).json(order);
    });
}