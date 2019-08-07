const products = require("../controllers/product.controllers");
const express = require("express");
const router = express.Router();

// Find product by ID / Find all products
router.route('/').get((req, res) => { 
    if (req.query.id) {
        products.findProductsById(req.query.id).then((data, error) => {
            if (data.length == 0) {
                res.send("Empty data!")
            } else {
                res.send(data);
            }
        }).catch((error) => {
            res.send("Product with id " + req.query.id + " not found");
        });
    } else {
        products.findAllProducts().then((data, error) => {
            if (data.length == 0) { 
                res.send("Empty data!")
            } else {
                res.send(data);
            }
        }).catch((error) => {
            res.send("Server not working");
        });
    }

// Add new product
}).post((req, res) => {
    products.addOneProduct(req.body).then((data, error) => {
        if (data.length == 0) {
            res.send("Empty data!")
        } else {
            res.send(data);
        }
    }).catch((error) => {
        res.send(error);
    });

// Delet product by ID
}).delete((req, res) => {
    products.deleteOneProduct(req.query.id).then((data, error) => {
        if (data.length == 0) {
            res.send("Empty data!");
        } else {
            res.send("Succesfuly deleted!");
        }
    }).catch((error) => {
        res.send("Product with id " + req.query.id + " not found");
    });

// Update product
}).put((req, res) => {
    products.updateOneProduct(req.query.id,req.body).then((data, error) => {
        if (data.length === 0) {
            res.send("Product with id " + req.query.id + " not found");
            return;
        } 
        res.send("successfully updated");
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;