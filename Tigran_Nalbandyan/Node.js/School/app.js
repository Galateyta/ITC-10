const express = require('express');
const bodyParser = require('body-parser');
const { check, oneOf, validationResult } = require('express-validator');
const students = require('./routers/students');
  
const app = express();
const port = 8000;

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

app.use('/students', students);

// app.get('/teachers', (req, res) => res.send(db.teachers));
// app.get('/teachers/:id', (req, res) => {
//   let teacher = db.teachers.find(function (element) {
//     return element.id == req.params.id;
//   })
//   if (!teacher) {
//     teacher = `There is no teacher for id ${req.params.id}`;
//   }
//   res.send(teacher);
// });
// app.post('/addTeacher', (req, res) => {
//   newTeacher = req.body;
//   newTeacher.id = ++lastId;
//   db.teachers.push(newTeacher);
//   res.send(`${newTeacher.name} successfully added`);
// });
// app.delete('/deleteTeacher/:id', (req, res) => {
//   let message = `There is no teacher for id ${req.params.id}`;
//   for (let i = 0; i < db.teachers.length; i++) {
//     if (db.teachers[i].id.toString() === req.params.id) {
//       db.teachers.splice((i - 1), 1);
//       message = `Teacher ${req.params.name} successfully deleted`;
//       break;
//     }
//   }
//   res.send(message);
// });
// app.put('/editTeacher/:id', (req, res) => {
//   let message = `There is no teacher for id ${req.params.id}`;
//   for (let i = 0; i < db.teachers.length; i++) {
//     if (db.teachers[i].id.toString() === req.params.id) {
//       newTeacher = req.body;
//       newTeacher.id = req.params.id;
//       db.teachers[i] = newTeacher;
//       message = `Teacher ${req.params.name} successfully edited`;
//       break;
//     }
//   }
//   res.send(message);
// });

// app.get('/subjects', (req, res) => res.send(db.subjects));
// app.post('/addSubject', (req, res) => {
//   newSubject = req.body.name;
//   db.subjects.push(newSubject);
//   res.send(`${newSubject} successfully added`);
// });
// app.delete('/deleteSubject/:name', (req, res) => {
//   let message = `There is no subject ${req.params.name}`;
//   for (let i = 0; i < db.subjects.length; i++) {
//     if (db.subjects[i] === req.params.name) {
//       db.subjects.splice((i - 1), 1);
//       message = `Subject ${req.params.name} successfully deleted`;
//       break;
//     }
//   }
//   res.send(message);
// });
// app.put('/editSubject/:name', (req, res) => {
//   let message = `There is no subject ${req.params.name}`;
//   for (let i = 0; i < db.subjects.length; i++) {
//     if (db.subjects[i] === req.params.name) {
//       db.subjects[i] = req.body.name;
//       message = `Subject ${req.params.name} successfully edited`;
//       break;
//     }
//   }
//   res.send(message);
// });

// app.get('/classes', (req, res) => res.send(db.classes));
// app.post('/addClass', (req, res) => {
//   newClass = req.body.name;
//   db.classes.push(newClass);
//   res.send(`${newClass} successfully added`);
// });
// app.delete('/deleteClass/:name', (req, res) => {
//   let message = `There is no class ${req.params.name}`;
//   for (let i = 0; i < db.classes.length; i++) {
//     if (db.classes[i] === req.params.name) {
//       db.classes.splice((i - 1), 1);
//       message = `Class ${req.params.name} successfully deleted`;
//       break;
//     }
//   }
//   res.send(message);
// });
// app.put('/editClass/:name', (req, res) => {
//   let message = `There is no class ${req.params.name}`;
//   for (let i = 0; i < db.classes.length; i++) {
//     if (db.classes[i] === req.params.name) {
//       db.classes[i] = req.body.name;
//       message = `Class ${req.params.name} successfully edited`;
//       break;
//     }
//   }
//   res.send(message);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}`));

module.exports = app; // для тестированияs