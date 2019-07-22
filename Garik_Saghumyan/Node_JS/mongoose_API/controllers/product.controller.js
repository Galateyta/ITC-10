const Product = require('../models/product.model');
let productPostFunction =  function(req, res){
    if(!req.body) return res.sendStatus(400);
    const productName = req.body.name;
    const productPrice = req.body.price;
    const productDesc = req.body.description;
    const productType = req.body.type;
    const productImg = req.body.img;
    const product = new Product({name: productName, price: productPrice, description: productDesc, type: productType, img: productImg});
    let error = product.validateSync();        
    product.save().then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.send(error.message)
    });
}
let productGetFunction = function(req, res){
    Product.find({}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.status(404).send('Products not found!');
    });
}
let productGetById = function(req, res){     
    const id = req.params.id;
    Product.findOne({_id: id}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.status(404).send('Product not found!');
    });
}
let productDeleteById =  function(req, res){     
    const id = req.params.id;
    Product.findByIdAndDelete(id).then((result) => {
        res.send(result)
    }).catch((reject) => {
        res.status(404).send('Products not found!');
    });
};
let updateProduct = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const productName = req.body.name;
    const productDesc = req.body.description;
    const productPrice = req.body.price;
    const productType = req.body.type;
    const productImg = req.body.img;
    const newProduct = {name: productName, description: productDesc, price: productPrice, type: productType, img: productImg};
    Product.findOneAndUpdate({_id: id}, newProduct, {new: true}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.status(404).send('Products not found!');
    });
};
module.exports.productPostFunction = productPostFunction;
module.exports.productGetFunction = productGetFunction;
module.exports.productGetById = productGetById;
module.exports.productDeleteById = productDeleteById;
module.exports.updateProduct = updateProduct;


