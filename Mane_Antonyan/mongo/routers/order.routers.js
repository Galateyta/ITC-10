const orders = require("../controllers/order.controllers");
const express = require("express");
const router = express.Router();

// Find order by ID / Find all orders 
router.route('/').get((req, res) => { 
    if (req.query.id) {
        orders.findOrdersById(req.query.id).then((data, error) => {
            if (data.length == 0) {
                res.send("Empty data!")
            } else {
                res.send(data);
            }
        }).catch((error) => {
            res.send("Order with id " + req.query.id + " not found");
        });
    } else {
        orders.findAllOrders().then((data, error) => {
            if (data.length == 0) { 
                res.send("Empty data!")
            } else {
                res.send(data);
            }
        }).catch((error) => {
            res.send("Server not working");
        });
    }

// Add new order
}).post((req, res) => {
    orders.addOneOrder(req.body).then((data, error) => {
        if (data.length == 0) {
            res.send("Empty data!")
        } else {
            res.send(data);
        }
    }).catch((error) => {
        res.send(error);
    });

// Delete order by ID
}).delete((req, res) => {
    orders.deleteOneOrder(req.query.id).then((data, error) => {
        if (data.length == 0) {
            res.send("Empty data!");
        } else {
            res.send("Succesfuly deleted!");
        }
    }).catch((error) => {
        res.send("Order with id " + req.query.id + " not found");
    });

// Update order
}).put((req, res) => {
    orders.updateOneOrder(req.query.id,req.body).then((data, error) => {
        if (data.length === 0) {
            res.send("Order with id " + req.query.id + " not found");
            return;
        } 
        res.send("successfully updated");
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;