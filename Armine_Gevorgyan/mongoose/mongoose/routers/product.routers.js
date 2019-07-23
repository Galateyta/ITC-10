const products = require('../controllers/product.controllers.js');
const express = require('express');
const User = require('../models/user.models');
const router = express.Router();


async function checkAdmin(req, res, next) {
 try {
   console.log(req.headers.authorization);
   if(req.headers.authorization){
     let id = req.headers.authorization;
     let result = await User.findById(id);
     console.log(result);
     if(result.role != "admin") {
       res.status(403).json(error);
     } else {
       next();
     }
   } else {
     res.status(403).json(error);
   }
  } catch (error) {
    res.status(401).json(error);
  }
}

router.route('/').get((req, res) => {
  if (req.query.id) {
      products.findProductsById(req, res);
  } else {
      products.findProducts(req, res);
  }
})
.post(checkAdmin, (req, res) => {
    products.addProduct(req.body).then((data, err) => {
        if (data.length == 0) {
            res.send("Not found")
            return
        }
        res.send(data);
    })
    .catch((err) => {
        res.send(err);
    });
})
.delete(checkAdmin, (req, res) => {
    products.deleteProduct(req.query.id).then((data, err) => {
        if (data.length == 0) {
            res.send("Not found");
            return;
        }
        res.send(`Product by id ${req.query.id} successfully deleted`);
    }).catch((err) => {
        res.send(`Product by id ${req.query.id} not found`);
    });
})
.put(checkAdmin, (req, res) => {
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
