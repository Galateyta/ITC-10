const Product = require('../models/product.models');
const logger = require('../logging/logger.js');

async function addProduct(req, res) {
    const newProduct = new Product(req.body);
    try {
        const data = await newProduct.save()
        if (!data) {
            logger.log('debug', `res /products 400`);
            logger.log('debug', `res /products No record found`);
    
            res.status(404).json({
                message: "No record found"
            });
            return;
        }

        logger.log('debug', `res /products 200`);
        logger.log('debug', `res /products ${JSON.stringify(data)}`);

        res.status(200).json(data);
    } catch (err) {
        logger.log('err', `res /products ${JSON.stringify(err)}`);
        res.status(400).json(err);
    }
}

async function getProducts(req, res) {
    if (req.query.id) {
        try {
            const product = await Product.findById(req.query.id);
            if (!product) {
                logger.log('debug', `res /products 400`);
                logger.log('debug', `res /products Product by id ${req.query.id} not found`);
        
                res.status(404).json({
                    message: `Product by id ${req.query.id} not found`
                });
                return;
            }

            logger.log('debug', `res /products 200`);
            logger.log('debug', `res /products ${JSON.stringify(product)}`);

            res.status(200).json(product);
        } catch (err) {
            res.status(404).json(err);
        }
    } else {
        try {
            const product = await Product.find({});
            if (!product) {
                logger.log('debug', `res /products 400`);
                logger.log('debug', `res /products No record found`);

                res.status(404).json({
                    message: "No record found"
                });
                return;
            }

            logger.log('debug', `res /products 200`);
            logger.log('debug', `res /products ${JSON.stringify(product)}`);

            res.status(200).json(product);
        } catch (err) {
            logger.log('err', `res /products ${JSON.stringify(err)}`);
            res.status(400).json(err);
        }
    }
}

async function deleteProduct(req, res) {
    try {
        await Product.deleteOne({
            _id: req.query.id
        });

        logger.log('debug', `res /products 200`);
        logger.log('debug', `res /products Product by id ${req.query.id} successfully deleted`);

        res.status(200).json({
            message: `Product by id ${req.query.id} successfully deleted`
        });
    } catch (err) {
        logger.log('err', `res /products ${JSON.stringify(err)}`);
        res.status(404).json({
            message: `Product by id ${req.query.id} not found`
        });
    }
}

async function updateProduct(req, res) {
    if (req.body.id) {
        logger.log('debug', `res /products 400`);
        logger.log('debug', `res /products Invalid requests: Unexpected id property`);

        res.status(400).json({
            message: "Invalid requests: Unexpected id property"
        });
        return;
    }

    try {
        await Product.updateOne({
            _id: req.query.id
        }, req.body, {
            runValidators: true
        });

        logger.log('debug', `res /products 200`);
        logger.log('debug', `res /products Product by id ${req.query.id} successfully updated`);


        res.status(200).json({
            message: `Product by id ${req.query.id} successfully updated`
        });
    } catch (err) {
        logger.log('err', `res /products ${JSON.stringify(err)}`);
        res.status(404).json({
            message: `Product by id ${req.query.id} not found`
        });
    }
}

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;