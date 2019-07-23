const products = require('../controllers/products.cont');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
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
    })
    .get('/:id', (req, res) => {
        products.findProductsById(req.params.id).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found")
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(`${req.params.id} not found`);
        });
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
    .delete('/:id', (req, res) => {
        products.deleteProduct(req.params.id).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found");
                return;
            }
            res.send(`${req.params.id} successfully deleted`);
        }).catch((err) => {
            res.send(`${req.params.id} not found`);
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
