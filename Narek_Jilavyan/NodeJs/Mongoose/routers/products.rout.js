const productsMid = require('../middlewares/products.mid');
const products = require('../controllers/products.cont');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(products.getProducts)
    .post(productsMid.checkAdmin, products.addProduct)
    router.put('/:id', products.updateProduct)
    router.delete('/:id', products.deleteProduct)
    router.get('/:id', products.getProduct)


module.exports = router;