const product = require('../models/product.models');

async function findProduct(req, res) {
    if (req.query.id) {
        try {
            const data = await product.findById(req.query.id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        try {
            const allProducts = await product.find({});
            if (allProducts) {
                res.status(200).json(allProducts);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            res.status(400).json(err);
        }
    }
}

async function deleteProduct(req, res) {
    try {
        const data = await product.deleteOne({_id: req.query.id});
        if (data) {
            res,status(200).json({
                message: "Product with " + req.query.id + "succesfully deleted"
            });
        } else {
            res.status(404).json({message: "Server not working"});
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

async function addProduct(req, res) {
    if (req.body) {
        const newProduct = new product(req.body);
        try {
            const data = await newProduct.save();
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch (err) {
            res.status(204).json(err);
        }
    } else {
        res.status(202).json({message: "Empty data!"})
    }
}

async function updateProduct(req, res) {
    if (req.body) {
        try {
            const id = req.query.id;
            const data = await product.updateOne({_id: id}, req.body, 
                {runValidators: true});
            if (data) {
                res.status(200).json({
                    message : "Product with " + id + " id succesfully updated" 
                });
            } else {
                res.status(404).json({message: "Product not exist!"});
            }
        } catch(err) {}       
    } else {
        res.status(202).json({message: "Empty data!"})
    }
}

module.exports.findProduct = findProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;