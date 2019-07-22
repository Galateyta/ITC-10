const student = require('../models/users.js');
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/users')

router.route('/')
.get(function(req, res){      
    User.find({}, function(err, users){
        if(err) return console.log(err);
        res.send(users)
    });
})
.post(function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const user = new User({name: req.body.name, age: req.body.age, gender: req.body.gender, orders: req.body.orders});
        
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});

router.route('/:id')
.get(function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return console.log(err);
        res.send(user);
    });
})
.put(function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    //const correntUser = {name: req.body.name, age: req.body.age, gender: req.body.gender, orders: req.body.orders};
    User.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, user){console.log(user);console.log(req.body);     
        if(err) return console.log(err); 
        res.send(user);
    });
})
.delete(function(req, res){
         
        const id = req.params.id;
        User.findByIdAndDelete(id, function(err, user){
                    
            if(err) return console.log(err);
            res.send(user);
        });
    });
module.exports = router; 