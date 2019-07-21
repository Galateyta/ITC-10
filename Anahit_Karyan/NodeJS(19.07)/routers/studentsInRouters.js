const student = require('../models/studentsInModels');
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = express.Router();

router.route('/')
.get(function(req, res) {
	student.getStudents().then((value)=> {
    	console.log(value);
    	res.send(value);
    }).catch((error)=> {
		console.log("Error in queri select" + error);
		res.send(error);
    })
})
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect name ------'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect surname ------'),
    check('age').not().isEmpty().withMessage('-----Age is empty ------').isNumeric().isInt({ gt: 5, lt: 31 }).withMessage('-----Incorect age------'),
    check('class_id').not().isEmpty().withMessage('-----Class_id is empty ------').isNumeric().withMessage('-----Incorect class_id------'),
    check('gender').isIn(['male','female']).withMessage('----- Incorect gender,please enter the male or female------'),
    oneOf([[check('gender').equals('male')],[check('gender').equals('female')]])
   ],function(req, res) {
   		const errors = validationResult(req);
        if (!errors.isEmpty()) {
  	   		return res.status(422).jsonp(errors.array());
		} else {
			student.setStudents(req.body).then((value)=> {
				const student = {...req.body, id : value.insertId};
				res.send(student);
			}).catch( (error)=> {
				console.log("Error in queri Insert" + error);
				res.send(error);
			})
		}
});

router.route('/:id')
.get(function(req, res) {
    student.getStudentsById(req.params.id).then((value)=> {
        console.log(value);
        res.send(value);
    }).catch((error)=> {
        console.log("Error in queri select" + error);
        res.send(error);
    })    
})//----------------------"Unknown column 'Laa' in 'field list'"--------------------------------?
.put([
    check('name').not().isEmpty().withMessage('----Name is empty!-----').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect name ------'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect surname ------'),
    check('age').not().isEmpty().withMessage('-----Age is empty ------').isNumeric().isInt({ gt: 5, lt: 31 }).withMessage('-----Incorect age------'),
    check('class_id').not().isEmpty().withMessage('-----Class_id is empty ------').isNumeric().withMessage('-----Incorect class_id------'),
    check('gender').isIn(['male','female']).withMessage('----- Incorect gender,please enter the male or female------'),
    oneOf([[check('gender').equals('male')],[check('gender').equals('female')]])
   ],function(req, res) {
    student.putStudentsById(req.params.id, req.body).then((value)=> {
        const student = {...req.body, id : req.params.id};
        res.send(student);
    }).catch((error)=> {
        console.log("Error in queri update" + error);
        res.send(error);
    })    
})//Cannot delete or update a parent row: a foreign key constraint fails-----------------------?
.delete(function(req, res) {
    student.deleteStudentsById(req.params.id).then((value)=> {
        console.log(value);
        res.send(value);
    }).catch((error)=> {
        console.log("Error in queri delete" + error);
        res.send(error);
    })    
})

module.exports = router; 