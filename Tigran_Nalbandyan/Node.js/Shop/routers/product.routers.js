const products = require('../controllers/product.controllers.js');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
        if (req.query.id) {
            products.findProductsById(req.query.id).then((data, err) => {
                if (data.length == 0) {
                    res.send("No record found")
                    return
                }
                res.send(data);
            })
            .catch((err) => {
                res.send(`Product by id ${req.query.id} not found`);
            });
        } else {
            products.findProducts().then((data, err) => {
                if (data.length == 0) {
                    res.send("No record found")
                    return
                }
                res.send(data);
            })
            .catch((err) => {
                res.send(`Invalid request`);
            });
        }
    })
    .post((req, res) => {
        products.addProduct(req.body).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found")
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
    })
    .delete((req, res) => {
        products.deleteProduct(req.query.id).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found");
                return;
            }
            res.send(`Product by id ${req.query.id} successfully deleted`);
        }).catch((err) => {
            res.send(`Product by id ${req.query.id} not found`);
        });
    })
    .put((req, res) => {
        products.updateProduct(req.query.id,req.body).then((data, err) => {
            if (data.length === 0) {
                res.send(`Product by id ${req.query.id} not found`);
                return;
            } 
            res.send(`Product by id ${req.query.id} successfully updated`);
        })
        .catch((err) => {
            res.send(err);
        });
    });

module.exports = router;