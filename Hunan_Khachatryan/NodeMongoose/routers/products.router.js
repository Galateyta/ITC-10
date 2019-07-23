const express = require('express');
const products = require('../controlers/products.controlers');
const admin = require('../middlewares/users.middleware')
const router = express.Router();

router.route('/')
.get(products.getAllProducts)
.post(admin.checkAdmin,products.addProduct)

router.route('/:id')
.get(products.getProductByID)
.put(admin.checkAdmin,products.updateProduct)
.delete(admin.checkAdmin,products.removeProduct)

module.exports = router;