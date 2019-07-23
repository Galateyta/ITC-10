const Product = require('../model/products.mod');

function addProduct(product) {
    const newProduct = new Product(product);
    return newProduct.save();
}

function findProducts() {
    return Product.find({}).exec();
}

function findProductsById(id) {
    return Product.findById(id).exec();
}

function deleteProduct(id) {
    return Product.deleteOne({
        _id: id
    }).exec();
}

function updateProduct(id, info) {
    return Product.updateOne({
        _id: id
    }, info, {runValidators: true}).exec();
}

module.exports.addProduct = addProduct;
module.exports.findProducts = findProducts;
module.exports.findProductsById = findProductsById;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;