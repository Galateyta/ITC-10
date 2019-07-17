var db = require("./schoolDb");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Authorization part
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
        res.send("Please enter a ITC10 for headers authorization")
    }
    next();
});

//Student part
app.route('/students')
.get(function(req, res) {
	res.send(db.students);
})
.post(function(req, res) {
	db.students.push(req.body);
	res.send(db.students);
})

app.route('/students/:id')
.get(function (req, res) {
	var item= db.students.find(elem => elem.id == req.params.id);
	if (item) {              
		res.send(item);
	} else {
		res.send("there is not student with mantioned id for get");
    }
})
.put(function(req, res ) { 
    var item= db.students.find(elem => elem.id == req.params.id); 
    if (item) { 
		db.students.forEach(function(element){ 
	    	if (element.id === item.id){
 				element.name = req.body.name; 
				element.surname = req.body.surname; 
			}
		}) 
		res.send(db.students);
 	} else { 
		res.send("there is not student with mantioned id for put"); 
	} 
})
.delete(function(req, res ) {
	if (req.params.id) {             
		db.students.splice((req.params.id - 1),1); 
		res.send(db.students);
	} else {
		res.send("there is not student with mantioned id for delete");
    }
})

//Teacher part
app.route('/teachers')
.get(function(req, res) {
	res.send(db.teachers);
})
.post(function(req, res) {
	db.teachers.push(req.body);
	res.send(db.teachers);
})

app.route('/teachers/:id')
.get(function (req, res) {
	var item= db.teachers.find(elem => elem.id == req.params.id);
	if (item) {              
		res.send(item);
	} else {
		res.send("there is not teacher with mantioned id for get");
    }
})
.put(function(req, res ) { 
    var item= db.teachers.find(elem => elem.id == req.params.id); 
    if (item) { 
		db.teachers.forEach(function(element){ 
	    	if (element.id === item.id){
 				element.name = req.body.name; 
				element.surname = req.body.surname; 
			}
		}) 
		res.send(db.teachers);
 	} else { 
		res.send("there is not teacher with mantioned id for put"); 
	} 
})
.delete(function(req, res ) {
	if (req.params.id) {             
		db.teachers.splice((req.params.id - 1),1); 
		res.send(db.teachers);
	} else {
		res.send("there is not teacher with mantioned id for delete");
    }
})

//Subject part
app.route('/subjects')
.get(function(req, res) {
	res.send(db.subjects);
})
.post(function(req, res) {
	db.subjects.push(req.body);
	res.send(db.subjects);
})

app.route('/subjects/:id')
.get(function (req, res) {
	var item= db.subjects.find(elem => elem.id == req.params.id);
	if (item) {              
		res.send(item);
	} else {
		res.send("there is not subject with mantioned id for get");
    }
})
.put(function(req, res ) { 
    var item= db.subjects.find(elem => elem.id == req.params.id); 
    if (item) { 
		db.subjects.forEach(function(element){ 
	    	if (element.id === item.id){
 				element.name = req.body.name; 
			}
		}) 
		res.send(db.subjects);
 	} else { 
		res.send("there is not subject with mantioned id for put"); 
	} 
})
.delete(function(req, res ) {
	if (req.params.id) {             
		db.subjects.splice((req.params.id - 1),1); 
		res.send(db.subjects);
	} else {
		res.send("there is not subject with mantioned id for delete");
    }
})

//Class part

app.route('/classes')
.get(function(req, res) {
	res.send(db.classes);
})
.post(function(req, res) {
	db.classes.push(req.body);
	res.send(db.classes);
})

app.route('/classes/:id')
.get(function (req, res) {
	var item= db.classes.find(elem => elem.id == req.params.id);
	if (item) {              
		res.send(item);
	} else {
		res.send("there is not classes with mantioned id for get");
    }
})
.put(function(req, res ) { 
    var item= db.classes.find(elem => elem.id == req.params.id); 
    if (item) { 
		db.classes.forEach(function(element){ 
	    	if (element.id === item.id){
 				element.grade = req.body.grade; 
			}
		}) 
		res.send(db.classes);
 	} else { 
		res.send("there is not classes with mantioned id for put"); 
	} 
})
.delete(function(req, res ) {
	if (req.params.id) {             
		db.classes.splice((req.params.id - 1),1); 
		res.send(db.classes);
	} else {
		res.send("there is not classes with mantioned id for delete");
    }
})

app.listen(9999);
