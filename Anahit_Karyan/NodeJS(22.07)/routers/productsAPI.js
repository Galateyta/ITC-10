const express = require('express');
const router = express.Router();
const controlellers = require('../controllers/productsInControllers');
const MiddlewaresUser = require('../middlewares/isUserMiddlewares');
const MiddlewaresAdmin = require('../middlewares/isAdminMiddlewares');
router.route('/')
.get(MiddlewaresUser.isUserMiddleware, MiddlewaresAdmin.isAdminMiddleware, controlellers.getAllProducts)
.post(MiddlewaresUser.isUserMiddleware, MiddlewaresAdmin.isAdminMiddleware, controlellers.postProduct);

router.route('/:id')
.get(MiddlewaresUser.isUserMiddleware, MiddlewaresAdmin.isAdminMiddleware, controlellers.getProductById)
.put(MiddlewaresUser.isUserMiddleware, MiddlewaresAdmin.isAdminMiddleware, controlellers.putProductById)
.delete(MiddlewaresUser.isUserMiddleware, MiddlewaresAdmin.isAdminMiddleware, controlellers.deleteProductById);
module.exports = router; 