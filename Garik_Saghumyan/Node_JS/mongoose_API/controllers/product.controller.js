const Product = require('../models/product.model');
let productPostFunction = async function(req, res){
    if(!req.body) return res.sendStatus(400);
    const productName = req.body.name;
    const productPrice = req.body.price;
    const productDesc = req.body.description;
    const productType = req.body.type;
    const productImg = req.body.img;
    const product = new Product({name: productName, price: productPrice, description: productDesc, type: productType, img: productImg});
    try {
        const result = await product.save();
        res.send(result);
    } catch (error) {
        res.status(422).json({message: error.message});
    }
}
let productGetFunction = async function(req, res){
    try {
        const result = await Product.find({});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Products not found!'});
    };
}
let productGetById = async function(req, res){     
    const id = req.params.id;
    try {
        const result = await Product.findOne({_id: id});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Product not found!'});
    };
}
let productDeleteById = async function(req, res){     
    const id = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Product not found!'});
    };
};
let updateProduct = async function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body._id;
    const productName = req.body.name;
    const productDesc = req.body.description;
    const productPrice = req.body.price;
    const productType = req.body.type;
    const productImg = req.body.img;
    const newProduct = {name: productName, description: productDesc, price: productPrice, type: productType, img: productImg};
    try {
        const result = await Product.findOneAndUpdate({_id: id}, newProduct, {new: true});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Product not found!'});
    };
};
module.exports.productPostFunction = productPostFunction;
module.exports.productGetFunction = productGetFunction;
module.exports.productGetById = productGetById;
module.exports.productDeleteById = productDeleteById;
module.exports.updateProduct = updateProduct;


