const order = require("../models/order.models");
const product = require("../models/product.models");
const user = require("../models/user.models");
const logger = require("../app").logger;

async function addOrder(req, res) {
    const newOrder = new order(req.body);
    req.body.price = await getPrice(req.body);
    const userID = req.header.authorization;
    try {
        const data = await newOrder.save();
        if (data) {
            const orderID = data.id;
            await user.updateOne({_id: userID}, {$push: {"orders": orderID}});
            res.status(200).json(data);
            logger.info("Normal response(add order).");
        } else {
            res.status(400).json({message : "Server not working!"});
            logger.error("Mongo server working bad(add order).");            
        }
    } catch(err) {
        res.status(400).json(err);
        logger.error("Catch (add order).");
    }
}

async function findOrder(req, res) {
    const id = req.query.id
    if (id) {
        try {
            const data = await order.findBysId(id);
            if (data) {
                logger.info("Normal response (find order by ID).");
                return res.status(200).json(data);
            } else {
                logger.error("Server working bad(find order by ID).");
                return res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            logger.error("catch (find order ny ID).");
            return res.status(400).json(err);
        }
    } else {
        const orders = await order.find({});
        try {
            if (orders) {
                logger.info("Normal response (find all orders).");
                return res.status(200).json(orders);
            } else {
                logger.error("Server working bad(find all orders).");
                return res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            logger.error({message : "Server working bad(find all orders)."});
            return res.status(400).json(err);
        }
    }
}

async function deleteOrder(req, res) {
    const id = req.query.id;
    const userID = req.header.authorization;
    if (id) {
        try {
            const data = await Order.deleteOne({_id: id});
            if (data) {
                const orderID = data.id;
                await user.updateOne({_id: userID}, {$pull: {"orders": orderID}});
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
    try {
        const id = req.query.id;
        const product = req.body.products;
        const quantity = req.body.quantity;
        const pr = req.body.price;
        if (pr) {
            res.status(203).json({message: "You cant update price!"});
        } else {
            let data = 0;
            let price = 0;
            let info;
            if (product && quantity) {
                data = await order.updateOne({_id : id}, req.body, {runValidators: true});
                info = order.findById(id);
                price = getOrderPrice(info);
                data = await order.updateOne({_id : id}, {"price": price}, {runValidators: true});
            } else if (product) {
                data = await order.updateOne({_id : id}, {"products": product}, {runValidators: true});
                info = order.findById(id);
                price = getOrderPrice(info);
                data = await order.updateOne({_id : id}, {"price": price}, {runValidators: true});    
            } else if (quantity) {
                data = await order.updateOne({_id : id}, {"quantity": quantity}, {runValidators: true});
                info = order.findById(id);
                price = getOrderPrice(order);
                data = await order.updateOne({_id : id}, {"price": price}, {runValidators: true});
            } else {
                res.status(202).json({message: "Empty request body"});
                return;
            }

            if (data) {
                res.status(200).json({
                    message: "Order with " + id + " if succesfully updated"
                });
        } else {
            res.status(404).json({message: "Server not working"});
        }
        }
    } catch(err) {
        res.status(400).json(err);
    }
}

async function getOrderPrice(info) {
    let price = 0;
    for (productId of info.products) {
        await product.findById(productId).exec() // get object from await
        .then((result) => {
            price += result.price;
        })
    }
    return price * info.quantity;
}

module.exports.findOrder = findOrder;
module.exports.addOrder = addOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;