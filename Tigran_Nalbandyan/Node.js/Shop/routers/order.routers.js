const orders = require('../controllers/order.controllers.js');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
        if (req.query.id) {
            orders.findOrdersById(req.query.id).then((data, err) => {
                if (data.length == 0) {
                    res.send("No record found")
                    return
                }
                res.send(data);
            })
            .catch((err) => {
                res.send(`Order by id ${req.query.id} not found`);
            });
        } else {
            orders.findOrders().then((data, err) => {
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
        orders.addOrder(req.body).then((data, err) => {
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
        orders.deleteOrder(req.query.id).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found");
                return;
            }
            res.send(`Order by id ${req.query.id} successfully deleted`);
        }).catch((err) => {
            res.send(`Order by id ${req.query.id} not found`);
        });
    })
    .put((req, res) => {
        orders.updateOrder(req.query.id,req.body).then((data, err) => {
            if (data.length === 0) {
                res.send(`Order by id ${req.query.id} not found`);
                return;
            } 
            res.send(`Order by id ${req.query.id} successfully updated`);
        })
        .catch((err) => {
            res.send(err);
        });
    });

module.exports = router;