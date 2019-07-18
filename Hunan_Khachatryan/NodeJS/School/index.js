const http = require('http');
const express = require('express');
var bodyParser = require('body-parser')
var db = require('./db');
var app = express(); 
var server = http.createServer(app); 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    if ( req.headers.authorization !== 'ITC10'){
        res.send('Wrong authorisation');
    }
        next();    
  });


  app.get( '/students',function (req, res) {
    res.send(db.students);
  });
  app.post('/students/add', function (req, res) {
      console.log(req.body);
      db.students.push(req.body);
      res.send(db.students);
    
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
   .put(function(req, res ){ 
       var item= db.students.find(x => x.id == req.params.id);
        console.log(item.id); 
        if (item){
             db.students.forEach(function(element){
                  if (element.id === item.id){
                       element.name = req.body.name;
                       element.surname = req.body.surname;
                       element.classid = req.body.classid;
                     } })
         res.send(db.students); 
        }else {
             res.send("Not found student by following id"); 
        } })
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
