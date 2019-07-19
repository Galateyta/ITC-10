const express = require('express');
const app = express();
const students = require('./routers/students');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
    	res.status(401);
        res.send("Headers authorization not a ITC10");
    }
    next();
});

app.use('/students', students);

app.listen(8090);
module.exports.app = app;