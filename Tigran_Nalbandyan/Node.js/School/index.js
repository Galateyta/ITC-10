const express = require('express');
const bodyParser = require('body-parser');
const { check, oneOf, validationResult } = require('express-validator');
  
const app = express();
const port = 8000;

const db = require('./db.js');
let lastId = 4;

// let student = {
//     name: 'aziz',
//     surname: 'zzz',
//     age: 16,
//     gender: 'female',
//     class_id: 3
// };
// db.addStudent(student).then((value) => {
//     console.log(value.insertId);
// });
// db.getStudents().then((value) => {
//     console.log(value);
// });


app.use((req, res, next) => {
  if (req.headers.authorization !== 'ITC10') {
    res.statusCode = 401;
    res.end('401 Unauthorized\nAccess denied');
    res.send;
  } else {
    next();
  }
})
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/students', (req, res) => {
  db.getStudents().then((result) => {
    res.send(result);
  });
  // if (req.query.grade) {
  //   res.send(students.filter((student) => student.grade === req.query.grade));
  // } else {
  //   res.send(students);
  // }
});
app.get('/students/:id', (req, res) => {
  let student = db.students.find(function (element) {
    return element.id == req.params.id;
  });
  if (!student) {
    student = `There is no student for id ${req.params.id}`;
  }
  res.send(student);
});
app.post('/addStudent',
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

  check('email', 'Email is required').exists(),
  check('email').isEmail(),

  check('gender', 'Gender is required').exists(),
  check('gender', 'Gender can be male or female').isIn(['male', 'female']),

  oneOf([[
    check('gender').equals('male'),
    check("carNumber", "Ivalid car number").matches("^[0-9]{2}[A-Z]{2}[0-9]{3}$"),
  ], [
    check('gender').equals('female'),
  ]]),

], 
function (req, res)  {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  newStudent = req.body;
  db.addStudent(newStudent).then((result) => {
    res.send(`Student ${body.name} added with id ${result.insertId}`);
  }).catch((err) => {
    res.send(`MySQL error: ${err}`);
  });
});
app.delete('/deleteStudent/:id', (req, res) => {
  let message = `There is no student for id ${req.params.id}`;
  for (let i = 0; i < db.students.length; i++) {
    if (db.students[i].id.toString() === req.params.id) {
      db.students.splice((i - 1), 1);
      message = `Student ${req.params.firstname} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editStudent/:id', (req, res) => {
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

app.get('/teachers', (req, res) => res.send(db.teachers));
app.get('/teachers/:id', (req, res) => {
  let teacher = db.teachers.find(function (element) {
    return element.id == req.params.id;
  })
  if (!teacher) {
    teacher = `There is no teacher for id ${req.params.id}`;
  }
  res.send(teacher);
});
app.post('/addTeacher', (req, res) => {
  newTeacher = req.body;
  newTeacher.id = ++lastId;
  db.teachers.push(newTeacher);
  res.send(`${newTeacher.name} successfully added`);
});
app.delete('/deleteTeacher/:id', (req, res) => {
  let message = `There is no teacher for id ${req.params.id}`;
  for (let i = 0; i < db.teachers.length; i++) {
    if (db.teachers[i].id.toString() === req.params.id) {
      db.teachers.splice((i - 1), 1);
      message = `Teacher ${req.params.name} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editTeacher/:id', (req, res) => {
  let message = `There is no teacher for id ${req.params.id}`;
  for (let i = 0; i < db.teachers.length; i++) {
    if (db.teachers[i].id.toString() === req.params.id) {
      newTeacher = req.body;
      newTeacher.id = req.params.id;
      db.teachers[i] = newTeacher;
      message = `Teacher ${req.params.name} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.get('/subjects', (req, res) => res.send(db.subjects));
app.post('/addSubject', (req, res) => {
  newSubject = req.body.name;
  db.subjects.push(newSubject);
  res.send(`${newSubject} successfully added`);
});
app.delete('/deleteSubject/:name', (req, res) => {
  let message = `There is no subject ${req.params.name}`;
  for (let i = 0; i < db.subjects.length; i++) {
    if (db.subjects[i] === req.params.name) {
      db.subjects.splice((i - 1), 1);
      message = `Subject ${req.params.name} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editSubject/:name', (req, res) => {
  let message = `There is no subject ${req.params.name}`;
  for (let i = 0; i < db.subjects.length; i++) {
    if (db.subjects[i] === req.params.name) {
      db.subjects[i] = req.body.name;
      message = `Subject ${req.params.name} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.get('/classes', (req, res) => res.send(db.classes));
app.post('/addClass', (req, res) => {
  newClass = req.body.name;
  db.classes.push(newClass);
  res.send(`${newClass} successfully added`);
});
app.delete('/deleteClass/:name', (req, res) => {
  let message = `There is no class ${req.params.name}`;
  for (let i = 0; i < db.classes.length; i++) {
    if (db.classes[i] === req.params.name) {
      db.classes.splice((i - 1), 1);
      message = `Class ${req.params.name} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editClass/:name', (req, res) => {
  let message = `There is no class ${req.params.name}`;
  for (let i = 0; i < db.classes.length; i++) {
    if (db.classes[i] === req.params.name) {
      db.classes[i] = req.body.name;
      message = `Class ${req.params.name} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));

module.exports = app; // для тестированияs