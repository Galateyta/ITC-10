const express = require('express');
const app = express();
const students = require('./routers/studentsInRouters');
const admissinOfTheChool = require('./routers/admissinOfTheChool');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
    	res.statusCode = 401;
        res.send("Headers authorization not a ITC10");
    }
    next();
});

app.use('/students', students);
app.use('/admissinOfTheChool', admissinOfTheChool);

app.listen(8094);
module.exports.app = app;