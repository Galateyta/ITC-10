const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const students = require('./routers/routersStudents');
const parents = require('./routers/routersParents');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Authorization part

app.use(function (req, res, next) {

    if (req.headers.authorization !== 'ITC10') {
        res.statusCode = 401;
        res.send("Please enter a ITC10 for headers authorization")
    } else {
        next();
    }
});

app.use('/students',students);
app.use('/parents',parents);

app.listen(9999);
module.exports.app = app;
