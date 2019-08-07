const student = require("../models/students");
const clas = require('../models/class');
const parent = require('../models/parents')
const express = require('express');
const {
    check,
    validationResult,
} = require('express-validator');

const app = express();
app.route('/')
    .get(function (req, res) {
        student.getStudents().then((result) => {
            res.send(result);
        }).catch((reject) => {
            console.log(reject);
        })
    })
    .post([
        check('name').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Names first simbol must upper'),
        check('surname').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Surnames first simbol must upper'),
        check('age').isInt({gt: 4}).withMessage('Students age is too small').isInt({lt: 17}).withMessage('Students age is too big'),
        check('gender').isIn(['male', 'female']).withMessage('gender must be male or female'),
    ], function (req, res) {
        const errors = validationResult(req);
        let newStudent = {};
        let response = {};
        let newParent = {};
        newStudent.name = req.body.name;
        newStudent.surname = req.body.surname;
        newStudent.age = req.body.age;
        newStudent.gender = req.body.gender;
        newParent.name = req.body.parentsName;
        newParent.surname = req.body.parentsSurname;
        newParent.phone = req.body.parentsPhone;
        newParent.address = req.body.parentsAddress;
        clas.getClassesId(req.body.age).then((result) => {
            if (!errors.isEmpty()) {
                return res.status(422).jsonp(errors.errors[0].msg);
            } else {
                let classId = result[0].id;
                newStudent.class_id = classId;
                response.class_name = result[0].className;
                response.class_grade = result[0].classGrade;
                response.teacher = result[0].teacherName;
                response.subject = result[0].subjectName;
                student.insertStudent(newStudent).then((result) => {
                    newStudent.id = result.insertId;
                    newParent.student_id = newStudent.id;
                    parent.insertParent(newParent).then((result) => {
                        newParent.id = result.insertId;
                    })
                    res.send({
                        message: "Student successfully added!",
                        response
                    });
                }).catch((reject) => {
                    console.log(reject);
                })
            }
        }).catch((reject) => {
            console.log(reject)
        });
    });
module.exports = app;