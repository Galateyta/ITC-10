const order = require("../models/order.models");

async function addOrder(req, res) {
    const newOrder = new order(req.body);
    req.body.price = await getPrice(req.body);
    try {
        const data = await newOrder.save();
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({message : "Server not working!"});            
        }
    } catch(err) {
        res.status(400).json(err);
    }
}

async function findOrder(req, res) {
    const id = req.query.id
    if (id) {
        try {
            const data = await order.findBysId(id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            res.status(400).json(err);
        }
    } else {
        const orders = await order.find({});
        try {
            if (orders) {
                res.status(200).json(orders);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            res.status(400).json(err);
        }
    }
}

async function deleteOrder(req, res) {
    const id = req.query.id;
    if (id) {
        try {
            const data = await Order.deleteOne({_id: id});
            if (data) {
                res.status(200).json({
                    message: "Order with " + id + " id succesfully deleted"
                });
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            res.status(400).json(err);
        }
    } else {
        res.status(202).json({message: "Empty data"});
    }
}

async function updateOrder(req, res) {
    const id = req.query.id;
    try {
        const data = await order.updateOne({_id : id}, req.body, {runValidators: true});
        if (data) {
            res.status(200).json({
                message: "Order with " + id + " if succesfully deleted"
            });
        } else {
            res.status(404).json({message: "Server not working"});
        }
    } catch(err) {
        res.status(400).json(err);
    }
}

module.exports.findOrder = findOrder;
module.exports.addOrder = addOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;
