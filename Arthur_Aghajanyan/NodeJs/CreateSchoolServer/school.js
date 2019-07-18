var db = require("./schoolDb");
var express = require('express');
const { check, validationResult, oneOf } = require('express-validator');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Authorization part
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
        res.send("Please enter a ITC10 for headers authorization")
    } else {
        next();
    }
});

//Student part
app.route('/students')
.get(function(req, res) {
	res.send(db.students);
})
.post(check('name')
    .isLength({ min:3 })
    .matches(/^[A-Z]{1}[a-z]{1,}$/),
      
    check('surname')
        .isLength({ min:6 })
        .matches(/^[A-Z]{1}[a-z]{1,}$/),
    check('age')
        .isInt({ gt: 6, lt: 30 }),
    check('email')
        .isEmail(),
    check('gender')
        .isIn(['male', 'female']),
    oneOf([[
        check('gender').equals('male'),
        check('autoNumber').matches(/^[0-9]{2}[A-Z]{2}[0-9]{3}$/)
        ],[
        check('gender').equals('female')
        ]]),
      
    function(req, res) {

    console.log(req.body);
    var errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.status(400).json(errors.array());
    } else {
        db.students.push(req.body);
	    res.send(db.students);
    }
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
    for(let j = 0; j < db.students.length; j++){
        if(db.students[j].id == req.params.id){
            db.students.splice(j,1);
            res.send(db.students);
            return;
	    }
    }
    res.send("there is not student with mantioned id for delete");     
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
	for(let j = 0; j < db.students.length; j++){
        if(db.students[j].id == req.params.id){
            db.students.splice(j,1);
            res.send(db.students);
            return;
	    }
    }
	res.send("there is not teacher with mantioned id for delete");
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
	for(let j = 0; j < db.students.length; j++){
        if(db.students[j].id == req.params.id){
            db.students.splice(j,1);
            res.send(db.students);
            return;
	    }
	} 		
    res.send("there is not subject with mantioned id for delete");
    
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
	for(let j = 0; j < db.students.length; j++){
        if(db.students[j].id == req.params.id){
            db.students.splice(j,1);
            res.send(db.students);
            return;
	    }
    }
    res.send("there is not classes with mantioned id for delete");
})

app.listen(9999);
