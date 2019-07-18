const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./db');
const { check ,validationResult,oneOf} = require('express-validator');
const app = express(); 
const server = http.createServer(app); 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    if ( req.headers.authorization !== 'ITC10'){
        res.send('Wrong authorisation');
    }else{
        next();    
    }
  });

app.route('/students')
  .get( function (req, res) {
      
    res.send(db.students);
  })
  
.post( [
    check('name')
      .not().isEmpty().withMessage('The First name is required')
      .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Name must started upper simbols '),
    check('surname')
      .not().isEmpty().withMessage('The Last name is required')
      .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('SureName must started upper simbols '),
    check('age')
      .not().isEmpty().withMessage('The age is required')
      .isInt({gt:6, lt:30}).withMessage('Students age wil be in range 6-30'),
    check('email')
    .not().isEmpty().withMessage('The email is required')
    .isEmail().withMessage('Email is not validate'),
    check('gender')
    .not().isEmpty().withMessage('The age is required')
    .isIn(['male','female']).withMessage('Gender is not validate'),
    oneOf([[
        check('gender').equals('male'),
        check('carNumber')
        .not().isEmpty().withMessage('Car Numer is required')
        .matches(/^[0-9]{2}[A-Z]{2}[0-9]{3}$/).withMessage('Car Number not validate '),
      ], [
        check('gender').equals('female'),
        check('carNumber')
      ]])
  ], (req, res) => {
      const errors = validationResult(req);
    if ( !errors.isEmpty()){
        res.send(errors);
    }else{
      db.students.push(req.body);
      res.send(db.students);
    }
  });
app.route('/students/:id')
   .get(function(req, res){
          var item= db.students.find(x => x.id == req.params.id);

     if (item){
             
        res.send(item);
          }else{
            res.send("Not found student by following id");
          }
   })
   .put([
    check('name')
        .not().isEmpty().withMessage('The First name is required')
        .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Name must started upper simbols '),
    check('surname')
        .not().isEmpty().withMessage('The Last name is required')
        .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('SureName must started upper simbols '),
    check('age')
        .not().isEmpty().withMessage('The age is required')
        .isInt([{gt:6, lt:30}]).withMessage('Students age wil be in range 6-30'),
    check('email')
        .not().isEmpty().withMessage('The email is required')
        .isEmail().withMessage('Email is not validate'),
    check('gender')
        .not().isEmpty().withMessage('The age is required')
        .isIn(['male','female']).withMessage('Gender is not validate'),
    oneOf([[
        check('gender').equals('male'),
        check('carNomer')
        .not().isEmpty().withMessage('Car Nomer is required')
        .matches(/^[0-9]{2}[A-Z]{2}[0-9]{3}$/).withMessage('Car Nomer not validate '),
    ], [
        check('gender').equals('female'),
        check('carNomber')
    ]])
    ],function(req, res ){ 
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.send(errors);
        } else {
            var item= db.students.find(x => x.id == req.params.id);
                if (item){
                    db.students.forEach(function(element){
                        if (element.id === item.id){
                            element.name = req.body.name;
                            element.surname = req.body.surname;
                            element.email = req.body.email;
                            element.age = req.body.age;
                            element.carNomer = req.body.carNomer;
                            element.email = req.body.email;
                            } })
                res.send(db.students); 
                } else {
                    res.send("Not found the following student "); 
                }    
            }
        })
    .delete(function(req, res ){ 
        var item= db.students.find(x => x.id == req.params.id);
         console.log(item.id); 
         if (item){
              db.students =  db.students.filter(function(value, index, arr){

                return value.id !== item.id;
            });
          res.send(db.students); 
         }else {
              res.send("Not found student by following id"); 
         } });


app.get( '/teachers',function (req, res) {
res.send(db.teachers);
});
app.post('/teachers/add', function (req, res) {
    console.log(req.body);
    db.teachers.push(req.body);
    res.send(db.teachers);
});
app.route('/teachers/:id')
.get(function(req, res){
        var item= db.teachers.find(x => x.id == req.params.id);

    if (item){
            
    res.send(item);
        }else{
        res.send("Not found teacher by following id");
        }
})
.put(function(req, res ){ 
    var item= db.teachers.find(x => x.id == req.params.id);
    console.log(item.id); 
    if (item){
            db.teachers.forEach(function(element){
                if (element.id === item.id){
                    element.name = req.body.name;
                    element.surname = req.body.surname;
                    element.subject = req.body.subject;
                    } })
        res.send(db.teachers); 
    }else {
            res.send("Not found teacher by following id"); 
    } })
.delete(function(req, res ){ 
    var item= db.teachers.find(x => x.id == req.params.id);
        console.log(item.id); 
        if (item){
            db.teachers =  db.teachers.filter(function(value, index, arr){

            return value.id !== item.id;
        });
        res.send(db.teachers); 
        }else {
            res.send("Not found teachers by following id"); 
        } });


app.get( '/classes',function (req, res) {
    res.send(db.classes);
    });
    app.post('/classes/add', function (req, res) {
        console.log(req.body);
        db.classes.push(req.body);
        res.send(db.classes);
    });
app.route('/classes/:id')
.get(function(req, res){
        var item= db.classes.find(x => x.id == req.params.id);

    if (item){
            
    res.send(item);
        }else{
        res.send("Not found class by following id");
        }
})
.put(function(req, res ){ 
    var item= db.classes.find(x => x.id == req.params.id);
    console.log(item.id); 
    if (item){
            db.classes.forEach(function(element){
                if (element.id === item.id){
                    element.number = req.body.number;
                    element.studCount = req.body.studCount;
                    } })
        res.send(db.classes); 
    }else {
            res.send("Not found class by following id"); 
    } })
.delete(function(req, res ){ 
    var item= db.classes.find(x => x.id == req.params.id);
        console.log(item.id); 
        if (item){
            db.classes =  db.classes.filter(function(value, index, arr){

            return value.id !== item.id;
        });
        res.send(db.classes); 
        }else {
            res.send("Not found class by following id"); 
        } });

app.get( '/subjects',function (req, res) {
    res.send(db.subjects);
    });
    app.post('/subjects/add', function (req, res) {
        console.log(req.body);
        db.subjects.push(req.body);
        res.send(db.subjects);
    });
app.route('/subjects/:id')
.get(function(req, res){
        var item= db.subjects.find(x => x.id == req.params.id);

    if (item){
            
    res.send(item);
        }else{
        res.send("Not found subject by following id");
        }
})
.put(function(req, res ){ 
    var item= db.subjects.find(x => x.id == req.params.id);
    console.log(item.id); 
    if (item){
            db.subjects.forEach(function(element){
                if (element.id === item.id){
                    element.name = req.body.name;
                    } })
        res.send(db.subjects); 
    }else {
            res.send("Not found subject by following id"); 
    } })
.delete(function(req, res ){ 
    var item= db.subjects.find(x => x.id == req.params.id);
        console.log(item.id); 
        if (item){
            db.subjects =  db.subjects.filter(function(value, index, arr){

            return value.id !== item.id;
        });
        res.send(db.subjects); 
        }else {
            res.send("Not found subject by following id"); 
        } });

  server.listen(4000);
