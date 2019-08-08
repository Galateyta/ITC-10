var express = require('express');
var routes =  require('routes');

var app = express();

let students = [{id : 0, name: "Armen", surname: "Gevorgyan", age : 15, classId: 9},
                {id : 1, name: "Ani", surname: "Kirakosyan", age : 14, classId: 8},
              {id : 2, name: "Gevorg", surname: "Hovsepyan", age : 15, classId: 9},
            {id : 3, name: "Hrant", surname: "Zaqaryan", age : 13, classId: 8}
          ];

let teachers = [{id : 0, name: "Hermine", surname: "Gevorgyan", age : 35, subject: "Matematika"},
                {id : 1, name: "Levon", surname: "Vardanyan", age : 24, subject: "Fizika"},
              {id : 2, name: "David", surname: "Babayan", age : 35, subject: "Informatika"},
            {id : 3, name: "Serine", surname: "Serobyan", age : 33, subject: "Grakanutyun"}
          ];

let subjects = [{id : 0, name : "Matematika", teacher : "Hermine Gevorgyan"},
                {id : 1, name : "Fizika", teacher : "Levon Vardanyan"},
              {id : 2, name : "Informatika", teacher : "David Babayan"},
            {id : 3,name : "Grakanutyun", teacher : "Serine Serobyan"}
          ];

let classes = [{id : 0, name : "9", dasghek : "Mane Antonyan"},
               {id : 1,name : "8", dasghek : "Gayane Ghazaryan"},
             {id : 2,name : "7", dasghek : "Meri Aghababyan"},
           {id : 3,name : "6", dasghek : "Karen Davtyan"}
          ];

Itc  = function (req, res, next) {
  console.log(req.head);
  next();
}

let newId = 4;

app.use(Itc);

app.get('/students', function(req, res) {
  let name = req.query.name;
  if(name != undefined){
    for(let i = 0; i < students.length; i++) {
      if(students[i].name == name){
        res.send(students[i]);
      }
    }
  } else {
    res.send(students);
  }
});

app.get('/students/:id', function(req, res) {
  let id = req.params.id;
  if(id != undefined){
    let elem = students.find(it => it.id == id )
    if(elem) {
    //  elem = {name : 888, age : 999 , surname : 111, classId : 9}
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(students);
  }

});

app.get('/teachers', function(req, res) {
  let name = req.query.name;
  if(name != undefined){
    for(let i = 0; i < teachers.length; i++) {
      if(teachers[i].name == name){
        res.send(teachers[i]);
      }
    }
  } else {
    res.send(teachers);
  }
});

app.get('/teachers/:id', function(req, res) {
  let id = req.params.id;
  if(id != undefined){
    let elem = teachers.find(it => it.id == id )
    if(elem) {
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(teachers);
  }

});


app.get('/subjects', function(req, res) {
  let name = req.query.name;
  if(name != undefined){
    for(let i = 0; i < subjects.length; i++) {
      if(students[i].name == name){
        res.send(subjects[i]);
      }
    }
  } else {
    res.send(subjects);
  }
});

app.get('/subjects/:id', function(req, res) {
  let id = req.params.id;
  if(id != undefined){
    let elem = subjects.find(it => it.id == id )
    if(elem) {
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(subjects);
  }

});

app.get('/classes', function(req, res) {
  let name = req.query.name;
  if(name != undefined){
    for(let i = 0; i < classes.length; i++) {
      if(classes[i].name == name){
        res.send(classes[i]);
      }
    }
  } else {
    res.send(classes);
  }
});

app.get('/classes/:id', function(req, res) {
  let id = req.params.id;
  if(id != undefined){
    let elem = classes.find(it => it.id == id )
    if(elem) {
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send(classes);
  }

});

// post

app.post('/students', function(req, res) {
  let {classId, name, surname, age} = req.query;
  students[students.length] = {id : newId, name : name, surname : surname, age : age, classId : classId};
  newId++;
  res.send("Added");
});



app.post('/teachers', function(req, res) {
  let {subject, name, surname, age} = req.query;
  teachers[teachers.length] = {id : newId, name : name, surname : surname, age : age, subject : subject};
  newId++;
  res.send("Ok");
});

app.post('/subjects', function(req, res) {
  let {name, teacher} = req.query;
  subjects[subjects.length] = {id : newId, name : name, teacher : teacher};
  newId++;
  res.send("Ok");
});

app.post('/classes', function(req, res) {
  let {name, dasghek} = req.query;
  classes[classes.length] = {id : newId, name : name, dasghek : dasghek};
  newId++;
  res.send(classes[classes.length]);
});

//put

app.put('/students/:id', function(req, res) {
  let id = req.params.id
  if(id < students.length){
    let elem = students.find(it => it.id == id )
    if(elem) {
      let {name, surname, age, classId} = req.query;
      elem = {id : id, name : name, surname : surname, age : age, classId : classId};
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send("The Student dose not find");
  }
});

app.put('/teachers/:id', function(req, res) {
  let id = req.params.id
  if(id < teachers.length) {
    let elem = teachers.find(it => it.id == id )
    if(elem) {
      let {name, surname, age, subject} = req.query;
      elem = {id : id, name : name, surname : surname, age : age, subject : subject};
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  } else {
    res.send("The Teacher dose not find");
  }
});

app.put('/subjects/:id', function(req, res) {
  let id = req.query.id
  if(id < teachers.length) {
    let elem = subjects.find(it => it.id == id )
    if(elem) {
      let {name, teachers} = req.query;
      elem = {id : id, name : name, teacher : teacher};
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  }  else {
    res.send("The Teacher dose not find");
  }
});

app.put('/classes/:id', function(req, res) {
  let id = req.params.id
  if(id < teachers.length) {
    let elem = classes.find(it => it.id == id )
    if(elem) {
      let {name, dasghek} = req.query;
      elem = {id : id, name : name, dasghek : dasghek};
      res.send(elem);
    } else {
      res.send("invalid id");
    }
  }  else {
    res.send("The Teacher dose not find");
  }
});

//Delete

app.delete('/students/:id', function(req, res) {
  let id = req.params.id;
  let index  = function () {
    for( let i = 0; i < students.length; ++i) {
      if(students[i].id = id) {
        return i;
      }
    }
    return -1;
  };

  if(index != -1) {
    students.splice(index,1);
    res.send("Deleted");
  } else {
    res.send("Can not Delete");
  }

});

app.delete('/teachers/:id', function(req, res) {
  let id = req.params.id;
  let index  = function () {
    for( let i = 0; i < teachers.length; ++i) {
      if(teachers[i].id = id) {
        return i;
      }
    }
    return -1;
  };

  if(index != -1) {
    teachers.splice(index,1);
    res.send("Deleted");
  } else {
    res.send("Can not Delete");
  }

});

app.delete('/subjects/:id', function(req, res) {
  let id = req.params.id;
  let index  = function () {
    for( let i = 0; i < subjects.length; ++i) {
      if(subjects[i].id = id) {
        return i;
      }
    }
    return -1;
  };

  if(index != -1) {
    subjects.splice(index,1);
    res.send("Deleted");
  } else {
    res.send("Can not Delete");
  }

});

app.delete('/classes/:id', function(req, res) {
  let id = req.params.id;
  let index  = function () {
    for( let i = 0; i < classes.length; ++i) {
      if(classes[i].id = id) {
        return i;
      }
    }
    return -1;
  };

  if(index != -1) {
    classes.splice(index,1);
    res.send("Deleted");
  } else {
    res.send("Can not Delete");
  }

});

app.listen(8000);
console.log("Server Run");
