const express = require('express');
const bodyParser = require('body-parser');
const { check, oneOf, validationResult } = require('express-validator');
  
const app = express();
const port = 8000;

let students = [{
  id: 1,
  firstname: 'Narek',
  lastname: 'Jilavyan',
  age: '17',
  grade: '10A'
}, {
  id: 2,
  firstname: 'Mane',
  lastname: 'Antonyan',
  age: '19',
  grade: '12B'
}];
let teachers = [{
  id: 3,
  name: 'Tigran',
  age: '16'
}, {
  id: 4,
  name: 'Garik',
  age: '27'
}];
let subjects = ['Python', 'Java'];
let classes = ['10A', '12B'];
let lastId = 4;

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
  if (req.query.grade) {
    res.send(students.filter((student) => student.grade === req.query.grade));
  } else {
    res.send(students);
  }
});
app.get('/students/:id', (req, res) => {
  let student = students.find(function (element) {
    return element.id == req.params.id;
  });
  if (!student) {
    student = `There is no student for id ${req.params.id}`;
  }
  res.send(student);
});
app.post('/addStudent',
[
  check('firstname', 'Firstname is required').exists(),
  check('firstname', 'Firstname must contain minimum 3 letter').isLength({
    min: 3
  }),
  check("firstname", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

  check('lastname', 'Lastname is required').exists(),
  check('lastname', 'Lastname must contain minimum 3 letter').isLength({
    min: 3
  }),
  check("lastname", "Only the first letter must be upper").matches("^[A-Z][-a-z]+$"),

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
  newStudent.id = ++lastId;
  students.push(newStudent);
  res.send(`${newStudent.firstname} successfully added`);
});
app.delete('/deleteStudent/:id', (req, res) => {
  let message = `There is no student for id ${req.params.id}`;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id.toString() === req.params.id) {
      students.splice((i - 1), 1);
      message = `Student ${req.params.firstname} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editStudent/:id', (req, res) => {
  let message = `There is no student for id ${req.params.id}`;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id.toString() === req.params.id) {
      newStudent = req.body;
      newStudent.id = req.params.id;
      students[i] = newStudent;
      message = `Student ${req.params.firstname} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.get('/teachers', (req, res) => res.send(teachers));
app.get('/teachers/:id', (req, res) => {
  let teacher = teachers.find(function (element) {
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
  teachers.push(newTeacher);
  res.send(`${newTeacher.name} successfully added`);
});
app.delete('/deleteTeacher/:id', (req, res) => {
  let message = `There is no teacher for id ${req.params.id}`;
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].id.toString() === req.params.id) {
      teachers.splice((i - 1), 1);
      message = `Teacher ${req.params.name} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editTeacher/:id', (req, res) => {
  let message = `There is no teacher for id ${req.params.id}`;
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].id.toString() === req.params.id) {
      newTeacher = req.body;
      newTeacher.id = req.params.id;
      teachers[i] = newTeacher;
      message = `Teacher ${req.params.name} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.get('/subjects', (req, res) => res.send(subjects));
app.post('/addSubject', (req, res) => {
  newSubject = req.body.name;
  subjects.push(newSubject);
  res.send(`${newSubject} successfully added`);
});
app.delete('/deleteSubject/:name', (req, res) => {
  let message = `There is no subject ${req.params.name}`;
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i] === req.params.name) {
      subjects.splice((i - 1), 1);
      message = `Subject ${req.params.name} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editSubject/:name', (req, res) => {
  let message = `There is no subject ${req.params.name}`;
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i] === req.params.name) {
      subjects[i] = req.body.name;
      message = `Subject ${req.params.name} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.get('/classes', (req, res) => res.send(classes));
app.post('/addClass', (req, res) => {
  newClass = req.body.name;
  classes.push(newClass);
  res.send(`${newClass} successfully added`);
});
app.delete('/deleteClass/:name', (req, res) => {
  let message = `There is no class ${req.params.name}`;
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === req.params.name) {
      classes.splice((i - 1), 1);
      message = `Class ${req.params.name} successfully deleted`;
      break;
    }
  }
  res.send(message);
});
app.put('/editClass/:name', (req, res) => {
  let message = `There is no class ${req.params.name}`;
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === req.params.name) {
      classes[i] = req.body.name;
      message = `Class ${req.params.name} successfully edited`;
      break;
    }
  }
  res.send(message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));