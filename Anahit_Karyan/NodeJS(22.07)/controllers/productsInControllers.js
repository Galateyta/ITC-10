const Product = require('../models/productsInModels')

module.exports.getAllProducts = function(req, res){      
    Product.find({}, function(err, product){
        if(err) return res.status(400).json(err);
        res.status(200).json(product)
    });
}

module.exports.postProduct = function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const product = new Product({name: req.body.name, price: req.body.price, description: req.body.description, type: req.body.type, img: req.body.img});
        
    product.save(function(err){
        if(err) return res.status(400).json(err);
        res.status(200).json(product);
    });
}

module.exports.getProductById = function(req, res){
         
    const id = req.params.id;
    Product.findOne({_id: id}, function(err, product){
          
        if(err) return res.status(400).json(err);
        res.status(200).json(product);
    });
}

module.exports.putProductById = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    Product.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, product){    
        if(err) return res.status(400).json(err);
        res.status(200).json(product);
    });
}

module.exports.deleteProductById = function(req, res){
         
    const id = req.params.id;
    Product.findByIdAndDelete(id, function(err, product){
                
        if(err) return res.status(400).json(err);
        res.status(200).json(product);
    });
}