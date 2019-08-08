const express = require('express');
const app = express();
const students = require("./routers/students");
const classes = require("./routers/class");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
        res.send('Invalid authorization');
        return;
    }
    next();
});
app.use("/students", students);
app.use("/classes", classes);
app.listen(10000);
module.exports.app = app;