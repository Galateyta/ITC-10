var express = require('express');
var routes =  require('routes');

var app = express();

let students = [{name: "Armen", surname: "Gevorgyan", age : 15, classId: 9},
                {name: "Ani", surname: "Kirakosyan", age : 14, classId: 8},
              {name: "Gevorg", surname: "Hovsepyan", age : 15, classId: 9},
            {name: "Hrant", surname: "Zaqaryan", age : 13, classId: 8}
          ];

let teachers = [{name: "Hermine", surname: "Gevorgyan", age : 35, subject: "Matematika"},
                {name: "Levon", surname: "Vardanyan", age : 24, subject: "Fizika"},
              {name: "David", surname: "Babayan", age : 35, subject: "Informatika"},
            {name: "Serine", surname: "Serobyan", age : 33, subject: "Grakanutyun"}
          ];


let subjects = [{name : "Matematika", teacher : "Hermine Gevorgyan"},
                {name : "Fizika", teacher : "Levon Vardanyan"},
              {name : "Informatika", teacher : "David Babayan"},
            {name : "Grakanutyun", teacher : "Serine Serobyan"}
          ];

let classes = [{name : "9", dasghek : "Mane Antonyan"},
               {name : "8", dasghek : "Gayane Ghazaryan"}
             ];

Itc  = function (req, res, next) {
  if (req.headers.authorization !== 'ITC-10') {
    res.send(" Headers authorization have not \n Please enter a ITC-10 for headers authorization ");
  } else {
    next()
  }
}

app.use(Itc);

app.get('/students', function(req, res) {
  let id = req.query.id;
  if(id != undefined){
    if(id < students.length){
      res.send(students[id]);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(students);
  }

});

app.get('/teachers', function(req, res) {
  let id = req.query.id;
  if(id != undefined){
    if(id < teachers.length){
      res.send(teachers[id]);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(teachers);
  }

});

app.get('/subjects', function(req, res) {
  let id = req.query.id;
  if(id != undefined){
    if(id < teachers.length){
      res.send(subjects[id]);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(teachers);
  }

});

app.get('/classes', function(req, res) {
  let id = req.query.id;
  if(id != undefined){
    if(id < teachers.length){
      res.send(classes[id]);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(teachers);
  }

});

app.post('/students', function(req, res) {
  let classId = req.query.classId;
  let name = req.query.name;
  let surname = req.query.surname;
  let age = req.query.age;
  students[students.length] = {name : name, surname : surname, age : age, classId : classId};
  res.send(students[students.length]);
});

app.post('/teachers', function(req, res) {
  let subject = req.query.subject;
  let name = req.query.name;
  let surname = req.query.surname;
  let age = req.query.age;
  teachers[teachers.length] = {name : name, surname : surname, age : age, subject : subject};
  res.send(students[students.length]);
});

app.post('/subjects', function(req, res) {
  let name = req.query.name;
  let teacher = req.query.teacher;
  subjects[subjects.length] = {name : name, teacher : teacher};
  res.send(subjects[subjects.length]);
});

app.post('/classes', function(req, res) {
  let name = req.query.name;
  let dasghek = req.query.dasghek;
  classes[classes.length] = {name : name, dasghek : dasghek};
  res.send(classes[classes.length]);
});

app.put('/students', function(req, res) {
  let id = req.query.id
  if(id < students.length){
    let classId = req.query.classId;
    let name = req.query.name;
    let surname = req.query.surname;
    let age = req.query.age;
    students[id] = {name : name, surname : surname, age : age, classId : classId};
    res.send(students[students.id]);
  } else {
    res.send("The Student dose not find");
  }
});

app.put('/teachers', function(req, res) {
  let id = req.query.id
  if(id < teachers.length) {
    let subject = req.query.subject;
    let name = req.query.name;
    let surname = req.query.surname;
    let age = req.query.age;
    teachers[id] = {name : name, surname : surname, age : age, subject : subject};
    res.send(teachers[teachers.id]);
  } else {
    res.send("The Teacher dose not find");
  }
});

app.put('/subjects', function(req, res) {
  let id = req.query.id
  if(id < teachers.length) {
    let name = req.query.name;
    let teacher = req.query.teacher;
    subjects[subjects.id] = {name : name, teacher : teacher};
    res.send(subjects[subjects.id]);
  } else {
    res.send("The Teacher dose not find");
  }
});

app.put('/classes', function(req, res) {
  let id = req.query.id
  if(id < teachers.length) {
    let name = req.query.name;
    let dasghek = req.query.dasghek;
    classes[classes.id] = {name : name, dasghek : dasghek};
    res.send(classes[classes.id]);
  } else {
    res.send("The Teacher dose not find");
  }
});

app.delete('/students', function(req, res) {
  let id = req.query.id
  if(id < students.length) {
    students.splice(id,1);
    res.send("Deleted");
  } else {
    res.send("The Teacher dose not find");
  }
});

app.delete('/teachers', function(req, res) {
  let id = req.query.id
  if(id < teachers.length) {
    students.splice(id,1);
    res.send("Deleted");
  } else {
    res.send("The Teacher dose not find");
  }
});

app.delete('/subjects', function(req, res) {
  let id = req.query.id
  if(id < subjects.length) {
    subjects.splice(id,1);
    res.send("Deleted");
  } else {
    res.send("The Teacher dose not find");
  }
});

app.delete('/classes', function(req, res) {
  let id = req.query.id
  if(id < classes.length) {
    classes.splice(id,1);
    res.send("Deleted");
  } else {
    res.send("The Teacher dose not find");
  }
});

app.listen(9000);
console.log("Server Run");
