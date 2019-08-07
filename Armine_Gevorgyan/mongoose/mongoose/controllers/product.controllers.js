const Product = require('../models/product.models');

function addProduct(product) {
    const newProduct = new Product(product);
    return newProduct.save();
}

async function findProducts(req, res) {
  const id = req.query.id;
  try {
    let result = await Product.find({})
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function findProductsById(req, res) {
  const id = req.query.id;
  try {
    let result = await Product.findById(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }

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
