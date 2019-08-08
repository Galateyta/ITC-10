const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const server = http.createServer(app); 
const students = require('./routers/students');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    if ( req.headers.authorization !== 'ITC10'){
        res.send('Wrong authorisation');
    }else{
        next();    
    }
  });
app.use('/students',students);

  
  server.listen(4000);
  module.exports.app = app;
