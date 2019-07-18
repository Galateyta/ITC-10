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
    res.send;
  } else {
    next();
  }
})
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.get('/students', (req, res) => res.send(students));
app.get('/students/:id', (req, res) => {
  let student = students.find(function (element) {
    return element.id == req.params.id;
  });
  if (!student) {
    student = `There is no student for id ${req.params.id}`;
  }
  res.send(student);
});
app.post('/addStudent', (req, res) => {
  newStudent = req.body;
  newStudent.id = ++lastId;
  students.push(newStudent);
  res.send(`${newStudent.name} successfully added`);
});
app.delete('/deleteStudent/:id', (req, res) => {
  let message = `There is no student for id ${req.params.id}`;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id.toString() === req.params.id) {
      students.splice((i - 1), 1);
      message = `Student ${req.params.id} successfully deleted`;
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
      message = `Student ${req.params.id} successfully edited`;
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
      message = `Teacher ${req.params.id} successfully deleted`;
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
      message = `Teacher ${req.params.id} successfully edited`;
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