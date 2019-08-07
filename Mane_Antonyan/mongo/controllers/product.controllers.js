const Product = require('../models/product.models');

function findAllProducts() {
    return Product.find({}).exec();
}

function findProductsById(id) {
    return Product.findById(id).exec();
}

function addOneProduct(product) {
    const newProduct = new Product(product);
    return newProduct.save();
}

function updateOneProduct(id, info) {
    return Product.updateOne({_id: id}, info,
        {runValidators: true}).exec();
}

function deleteOneProduct(id) {
    return Product.deleteOne({ _id: id }).exec();
}

module.exports.findAllProducts = findAllProducts;
module.exports.findProductsById = findProductsById;
module.exports.addOneProduct = addOneProduct;
module.exports.updateOneProduct = updateOneProduct;
module.exports.deleteOneProduct = deleteOneProduct;