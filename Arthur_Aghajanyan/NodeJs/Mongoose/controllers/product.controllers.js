const Product = require('../models/product.models');

async function addProduct(req, res) {
    const newProduct = new Product(req.body);
    try {
        const data = await newProduct.save()
        if (!data) {
            res.status(404).json({
                message: `No record found`
            })
            return
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function findProducts(req, res) {
    if (req.query.id) {
        try {
            const product = await Product.findById(req.query.id)
            if (!product) {
                res.status(404).json({
                    message: `No record found`
                })
                return
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        try {
            const product = await Product.find({})
            if (!product) {
                res.status(404).json({
                    message: `No record found`
                })
                return
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

async function deleteProduct(req, res) {
    try {
        const data = await Product.deleteOne({
            _id: req.query.id
        })
        if (!data.n) {
            res.status(404).json({
                message: `Product not found`
            });
        }
        res.status(200).json({
            message: `Product by id ${req.query.id} successfully deleted`
        })

    } catch (err) {
        res.status(400).json(err);
    };

}

async function updateProduct(req, res) {
    try {
        const data = await Product.updateOne({
            _id: req.query.id
        }, req.body, {
            runValidators: true
        })
        if (!data.n) {
            res.status(404).json({
                message: `Product not found`
            });
        }
        res.status(200).json({
            message: `Product by id ${req.query.id} successfully updated`
        });

    } catch (err) {
        res.status(400).json(err);
    };
}

module.exports.addProduct = addProduct;
module.exports.findProducts = findProducts;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
