const products = require('../controllers/product.controllers.js');
const express = require('express');
const router = express.Router();
const mid = require('../middlwares/middlwares.js')

router.route('/')
    .get(products.findProducts)
    .post(mid.checkAdmin,products.addProduct)
    .delete(mid.checkAdmin,products.deleteProduct)
    .put(mid.checkAdmin,products.updateProduct)

module.exports = router;
