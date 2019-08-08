const orders = require('../controllers/order.controllers.js');
const express = require('express');
const User = require('../models/user.models');
const router = express.Router();

async function checkUser(req, res, next) {
 try {
   console.log(req.headers.authorization);
   if(req.headers.authorization){
     let id = req.headers.authorization;
     let result = await User.findById(id);
     next();
   } else {
     res.status(401).json(error);
   }
  } catch (error) {
    res.status(401).json(error);
  }
}

router.route('/').get((req, res) => {
        if (req.query.id) {
            orders.findOrdersById(req, res);
        } else {
            orders.findOrders(req, res);
        }
    })
    .post(checkUser, (req, res) => {
        orders.addOrder(req, res );
    })
    .delete(checkUser, (req, res) => {
        orders.deleteOrder(req,res);
    })
    .put(checkUser, (req, res) => {
        orders.updateOrder(req,res);
    });

module.exports = router;
