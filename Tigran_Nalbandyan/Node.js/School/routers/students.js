const students = require('../models/students');
const express = require('express');
const {
    check,
    oneOf,
    validationResult
} = require('express-validator');

const router = express.Router();

router.route('/').get((req, res) => {
    if (req.params.id) {
        let student = students.find(function (element) {
            return element.id == req.params.id;
        });
        if (!student) {
            student = `There is no student for id ${req.params.id}`;
        }
        res.send(student);
    } else {
        students.getStudents().then((result) => {
            res.send(result);
        });
        // if (req.query.grade) {
        //   res.send(students.filter((student) => student.grade === req.query.grade));
        // } else {
        //   res.send(students);
        // }
    }
}).post(
    [
        check('name', 'Name is required').exists(),
        check('name', 'Name must contain minimum 3 letter').isLength({
            min: 3
        }),
        check("name", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

        check('surname', 'Surname is required').exists(),
        check('surname', 'Surname must contain minimum 3 letter').isLength({
            min: 3
        }),
        check("surname", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

        check('age', 'Age is required').exists(),
        check('age', 'Age must be greater than 6 and less than 30.').isInt({
            gt: 6,
            lt: 30
        }),

        check('gender', 'Gender is required').exists(),
        check('gender', 'Gender can be male or female').isIn(['male', 'female']),

        oneOf([
            [
                check('gender').equals('male'),
                // check("carNumber", "Ivalid car number").matches("^[0-9]{2}[A-Z]{2}[0-9]{3}$"),
            ],
            [
                check('gender').equals('female'),
            ]
        ]),

    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        newStudent = req.body;
        students.addStudent(newStudent).then((result) => {
            res.send(`Student ${req.body.name} added with id ${result.insertId}`);
        }).catch((err) => {
            res.send(`MySQL error: ${err}`);
        });
    }).delete((req, res) => {
    let message = `There is no student for id ${req.params.id}`;
    for (let i = 0; i < db.students.length; i++) {
        if (db.students[i].id.toString() === req.params.id) {
            db.students.splice((i - 1), 1);
            message = `Student ${req.params.firstname} successfully deleted`;
            break;
        }
    }
    res.send(message);
}).put((req, res) => {
    let message = `There is no student for id ${req.params.id}`;
    for (let i = 0; i < db.students.length; i++) {
        if (db.students[i].id.toString() === req.params.id) {
            newStudent = req.body;
            newStudent.id = req.params.id;
            db.students[i] = newStudent;
            message = `Student ${req.params.firstname} successfully edited`;
            break;
        }
    }
    res.send(message);
});

module.exports = router;