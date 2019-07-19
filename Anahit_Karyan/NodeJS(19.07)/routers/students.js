const student = require('../models/students');
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = express.Router();


let students = [
    {
     id : 1,
     name : 'Name1',
     surname : 'Surname1',
     age : 16,
     mail : 'add81@mail.ru',
     gender: 'male',
     authoNum : '25AV203'
    },
    {
     id : 2,
     name : 'Name2',
     surname : 'Surname2',
     age : 19,
     mail : 'add81@mail.ru',
     gender: 'male',
     authoNum : '25AV203'
    },
    {
     id : 3,
     name : 'Name3',
     surname : 'Surname3',
     age : 20,
     mail : 'add81@mail.ru',
     gender: 'female',
    }
];

router.route('/')
.get(function(req, res) {
	student.getStudents().then((value)=> {
				console.log(value);
				res.send(value);
			  }
).catch((error)=> {
			console.log("Error in queri select" + error);
			res.send(error);
})
	
})
.post(/*[
    check('name').not().isEmpty().withMessage('----Name is empty!-----').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect name ------'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect surname ------'),
    check('email').not().isEmpty().withMessage('-----Email is empty ------').normalizeEmail().isEmail().withMessage('-----Incorect email------'),
    check('age').not().isEmpty().withMessage('-----Age is empty ------').isNumeric().isInt({ gt: 5, lt: 31 }).withMessage('-----Incorect age------'),
    check('gender').isIn(['male','female']).withMessage('----- Incorect gender,please enter the male or female------'),
    oneOf([[
    	check('gender').equals('male'),
    	check('authoNum').not().isEmpty().withMessage('----Autho number is empty!-----').matches(/^[0-9]{2}[A-Z]{2}[0-9]{3}$/).withMessage('-----Incorect autho number ------')
    	],[
    	check('gender').equals('female')
    	]])
   ],*/function(req, res) {
   		const errors = validationResult(req);
        if (!errors.isEmpty()) {
  	   		return res.status(422).jsonp(errors.array());
		} else {console.log(req.body);
			student.setStudents(req.body).then((value)=> {
				const student = {...req.body, id : value.insertId};

				//console.log(value);
				res.send(student);
			}
			).catch( (error)=> {
				console.log("Error in queri Insert" + error);
				res.send(error);
			})
		}
});

router.route('/:id')
.get(function (req, res) {
	const student = students.find(item => item.id == req.params.id);
	student ? res.send(student) : res.send("Not student");
})
.put(function(req, res ) { 
    changeStudentInfo(req) ?  res.send(students) : res.send("Not student"); 
})
.delete(function(req, res ) {
    students.forEach((item, index) => {
		if(item.id == req.params.id) {
			students.splice(index, 1);
			res.send(students);
		}
	});
	res.send("Not student");
});

module.exports = router;