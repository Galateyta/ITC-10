const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

let students = [
  {
    id: 1,
    name: 'Narek',
    age: '17',
    grade: '10A'
  }, {
    id: 2,
    name: 'Mane',
    age: '19',
    grade: '12B'
  }
];
let teachers = [
  {
    id: 3,
    name: 'Tigran',
    age: '16'
  }, {
    id: 4,
    name: 'Garik',
    age: '27'
  }
];
let subjects = ['Python', 'Java'];
let classes = ['10A', '12B'];
let lastId = 4;

app.use((req, res, next) => {
  if (req.headers.authorization !== 'ITC10') {
    res.statusCode = 401;
    res.end('401 Unauthorized\nAccess denied');
    res.send
  } else {
    next()
  }
})
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/students', (req, res) => res.send(students));
app.get('/students/:id', (req, res) => res.send(students.find(function (element) {
  return element.id == req.params.id;
})));
app.post('/addStudent', (req, res) => {
  newStudent = req.body;
  newStudent.id = ++lastId;
  students.push(newStudent);
  res.send(`${newStudent.name} successfully added`);
});

app.get('/teachers', (req, res) => res.send(teachers));
app.get('/teachers/:id', (req, res) => res.send(teachers.find(function (element) {
  return element.id == req.params.id;
})));
app.post('/addTeacher', (req, res) => {
  newTeacher = req.body;
  newTeacher.id = ++lastId;
  teachers.push(newTeacher);
  res.send(`${newTeacher.name} successfully added`);
});

app.get('/subjects', (req, res) => res.send(subjects));
app.post('/addSubject', (req, res) => {
  newSubject = req.body.name;
  subjects.push(newSubject);
  res.send(`${newSubject} successfully added`);
});

app.get('/classes', (req, res) => res.send(classes));
app.post('/addClass', (req, res) => {
  newClass = req.body.name;
  classes.push(newClass);
  res.send(`${newClass} successfully added`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));