const parent = require("../models/modelsParents");
const express = require('express');
const { check, validationResult, oneOf } = require('express-validator');
const router = express.Router();

router.route('/')
.get(function(req, res) {

    parent.getParents()
    .then((value)=> {
        res.send(value);  // resultna models_i
    })
    .catch((error)=>{
        console.log("there are errors in query ->: " + error);
    }) 
})

.post(
    check('name')
        .isLength({ min:3 })
        .matches(/^[A-Z]{1}[a-z]{1,}$/),    
    check('surname')
        .isLength({ min:6 })
        .matches(/^[A-Z]{1}[a-z]{1,}$/),
    check('address')
        .isLength({ min:6 })
        .matches(/^[A-Z]{1}[a-z]{1,}$/),
    
    function(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
        } else {
            parent.insertParents(req.body)
            .then((value)=> {
                const parent = {...req.body ,id : value.insertId}
                res.send(parent);   
            })
            .catch((error)=>{
                console.log("there are errors in query ->: " + error);
            })
    }
})

module.exports = router;
