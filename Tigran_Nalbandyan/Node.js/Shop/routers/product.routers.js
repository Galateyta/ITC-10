const products = require('../controllers/product.controllers.js');
const express = require('express');
const checks = require('../middlewares/check.js');

const router = express.Router();
router.route('/')
    .get(products.getProducts)
    .post(checks.checkAdmin, products.addProduct)
    .delete(checks.checkAdmin, products.deleteProduct)
    .put(checks.checkAdmin, products.updateProduct);

module.exports = router;