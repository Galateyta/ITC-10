const clas = require('../models/class');
const express = require('express');
const app = express();

app.route('/')
    .get(function (req, res) {
        clas.getClasses().then((result) => {
            res.send(result);
        }).catch((reject) => {
            console.log(reject);
        })
    })
    .post(function (req, res) {
        let newClass = req.body;
        clas.insertClass(newClass).then((result) => {
            newClass.id = result.insertId;
            res.send(newClass);
        }).catch((reject) => {
            console.log(reject);
        })
    });

module.exports = app;