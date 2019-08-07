const Product = require('../models/products.mod');

async function getProducts(req, res){
    try {
        const data = await Product.find({});
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

async function getProduct(req, res){
    try {
        const data = await Product.findById(req.params.id);
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

async function addProduct(req, res){
    try {
        var newProduct = new Product(req.body);
        result = await newProduct.save();
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }
}

async function updateProduct(req, res){
    try {
        result = await Product.updateOne({ _id: req.params.id}, req.body , {runValidators: true}).exec();
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }  
}

async function deleteProduct(req, res){
    try {
        result = await Products.deleteOne({_id: req.params.id})
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    } 
}

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;