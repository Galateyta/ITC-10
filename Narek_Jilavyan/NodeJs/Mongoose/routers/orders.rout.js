const orders = require('../controllers/orders.cont');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
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
    })
    .get('/:id',(req, res) =>{
        orders.findOrdersById(req.params.id).then((data, err) => {
            if (data.length == 0) {
                res.send(`${req.params.id} not found`)
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(`${req.params.id} not found`);
        });
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
    .delete('/:id',(req, res) => {
        orders.deleteOrder(req.params.id).then((data, err) => {
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
        orders.updateOrder(req.query.id,req.body).then((data, err) => {
            if (data.length === 0) {
                res.send(`${req.query.id} not found`);
                return;
            } 
            res.send(`${req.query.id} successfully updated`);
        })
        .catch((err) => {
            res.send(err);
        });
    });

module.exports = router;