const Product = require('../models/productsInModels')

module.exports.getAllProducts = async function(req, res){      
    try {
        const product = await Product.find({});
        res.status(200).json(product)

    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.postProduct = async function (req, res) {
    if(!req.body) return res.sendStatus(400);
    try {
        const product = new Product({name: req.body.name, price: req.body.price, description: req.body.description, type: req.body.type, img: req.body.img});
        product.save();
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.getProductById = async function(req, res){     
    const id = req.params.id;
    try {
        const product = await Product.findOne({_id: id});
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.putProductById = async function(req, res){
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    try {
        const product = await Product.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.deleteProductById = async function(req, res){
         
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}