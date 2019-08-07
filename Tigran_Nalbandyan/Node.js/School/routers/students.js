const students = require('../models/students.js');
const teachers = require('../models/teachers.js');
const express = require('express');
const {check, validationResult} = require('express-validator');
const studentsController = require('../controllers/students.js');

const router = express.Router();

router.use('/requestApplication', [
  check('name', 'Name is required').exists(),
  check('name', 'Name must contain minimum 3 letter').isLength({min: 3}),
  check("name", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

  check('surname', 'Surname is required').exists(),
  check('surname', 'Surname must contain minimum 3 letter').isLength({min: 3}),
  check("surname", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

  check('age', 'Age is required').exists(),
  check('age', 'Age must be greater than 6 and less than 30.').isInt({gt: 6, lt: 30}),

  check('gender', 'Gender is required').exists(),
  check('gender', 'Gender can be male or female').isIn(['male', 'female'])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        errors: errors.array()
      });
  }
  if (req.method === 'POST') {
    const newStudent = req.body;
    studentsController
      .chooseClass(newStudent.age)
      .then(classResult => {
        newStudent.class_id = classResult.classId;
        teachers
          .getTeachers({classId: classResult.classId})
          .then(classTeachers => students
            .addStudent(newStudent)
            .then(result => res.send({message: `Student ${newStudent.name} added with id ${result.insertId} in class ${classResult.className} with teachers ${classTeachers.map(el => el.name + ' ' + el.surname)}`, classTeachers}))
            .catch((err) => res.send(`MySQL error: ${err}`)));
        ;
      });
    studentsController.updateStudentCount();
  } else {
    res.statusCode = 405;
    res.end('405 Method Not Allowed');
  }
})

router
  .route('/')
  .get((req, res) => {
    if (req.query.id) {
      students
        .getStudents({id: req.query.id})
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
    } else {
      students
        .getStudents()
        .then((result) => res.send(result));
      // if (req.query.grade) {   res.send(students.filter((student) => student.grade
      // === req.query.grade)); } else {   res.send(students); }
    }
  })
  .post([
    check('name', 'Name is required').exists(),
    check('name', 'Name must contain minimum 3 letter').isLength({min: 3}),
    check("name", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

    check('surname', 'Surname is required').exists(),
    check('surname', 'Surname must contain minimum 3 letter').isLength({min: 3}),
    check("surname", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

    check('age', 'Age is required').exists(),
    check('age', 'Age must be greater than 6 and less than 30.').isInt({gt: 6, lt: 30}),

    check('gender', 'Gender is required').exists(),
    check('gender', 'Gender can be male or female').isIn(['male', 'female']),

    check('class_id', 'class_id is required').exists()
  ], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({
          errors: errors.array()
        });
    }
    const newStudent = req.body;
    studentsController
      .chooseClass(newStudent.age)
      .then(classResult => {
        newStudent.class_id = classResult.classId
        students
          .addStudent(newStudent)
          .then((result) => {
            res.send(`Student ${newStudent.name} added with id ${result.insertId} in class ${classResult.className}`);
          })
          .catch((err) => {
            res.send(`MySQL error: ${err}`);
          });
      });
    studentsController.updateStudentCount();
  })
  .delete([check('id', 'id is required').exists()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({
          errors: errors.array()
        });
    }
    students
      .deleteStudent(req.query.id)
      .then((result) => {
        if (result.affectedRows == 0) 
          res.send(`There is no Student №${req.query.id}`);
        else 
          res.send(`Student №${req.query.id} successfully deleted`);
        }
      )
      .catch((err) => {
        res.send(`MySQL error: ${err}`);
      });
    studentsController.updateStudentCount();
  })
  .put((req, res) => {
    let message = `There is no student №${req.query.id}`;
    // TODO: add edit functionality
    message = `Student №${req.query.id} successfully edited`;
    res.send(message);
  });

module.exports = router;