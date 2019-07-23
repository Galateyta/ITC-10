const express = require('express');
const router = express.Router();
const controlellers = require('../controllers/productsInControllers');
router.route('/')
.get(controlellers.getAllProducts)
.post(controlellers.postProduct);

router.route('/:id')
.get(controlellers.getProductById)
.put(controlellers.putProductById)
.delete(controlellers.deleteProductById);

module.exports = router; 