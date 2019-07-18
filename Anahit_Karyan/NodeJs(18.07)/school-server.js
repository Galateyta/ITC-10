const express = require('express');
const app = express();
const { check, oneOf, validationResult } = require('express-validator');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

function changeStudentInfo (req) {
   	const student = students.find(item => item.id == req.params.id); 
   	if(student) {
        student.name = req.body.name; 
        student.surname = req.body.surname; 
        student.age = req.body.age;
        student.classId = req.body.classId;
 		return true;
 	} else {
 		return false;
 	}
};

app.route('/students')
.get(function(req, res) {
	res.send(students);
})
.post( [
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
   ],function(req, res) {
   		const errors = validationResult(req);
        if (!errors.isEmpty()) {
  	   		return res.status(422).jsonp(errors.array());
		} else {
			students.push(req.body);
			res.send(students);
		}
});

app.route('/students/:id')
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


app.listen(8080);