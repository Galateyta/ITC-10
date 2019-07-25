const products = require("../controllers/product.controllers");
const logger = require("../app");
const mid = require("../middlewere");
const express = require("express");
const router = express.Router();

router.route('/')
.get(products.findProduct)
.post(mid.isAdmin, products.addProduct)
.delete(products.deleteProduct)
.put(products.updateProduct);

module.exports = router;