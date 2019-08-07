// Mini-database)
var students = [{id: 1, name: "Mane", surname: "Antonyan"}];
var teachers = [{id: 1, name: "Davit", surname: "Grigoryan"}];
var subjects = [{id: 1, name: "Informatika"}];
var classes = [{id: 1, name: "12A"}];

// Request parsing
var express = require('express');
var app = express();
var body = require('body-parser');
app.use(body.urlencoded({extended: false}));
app.use(body.json());

// Is header valid
app.use(function (req, res, next) {
    if ('ITC10' !== req.headers.authorization) {
        res.send("Not valid header !!!");
    }
    next();
});

// All students (GET / POST)
app.route('/students')
.get(function(req, res) {    
    res.send(students);
})
.post(function(req, res) {
    students.push(req.body);
    res.send(students);
});

// Get student info by ID
app.route('/students/:id').get(function (req, res) {
    var info = students.find(it => it.id == req.params.id);
    if (info) {
        res.send(info);
    } else {
        res.send("Not valid ID for student!");
    }
})

// Update student info by ID
.put(function(req, res) { 
    var info = students.find(it => it.id == req.params.id); 
    if (info) {
        students.forEach(function(element) { 
            if (element.id === info.id) {
                element.name = req.body.name; 
                element.surname = req.body.surname; 
            }
        });
        res.send(students);
    } else {
        res.send("Not valid ID for student update!"); 
    } 
})

// Delete student by ID
.delete(function(req, res ) {
    if (req.params.id) {
        let size = students.length;
        for (let i = 0; i < size; ++i) {
            if (students[i].id == req.params.id){
                students.splice(i, 1);
                res.send(students);                
                return;
            }
        }
        res.send(students);
    } else {
        res.send("Not valid ID for student delete!");
    }
});

// All classes (GET / POST)
app.route('/classes').get(function(req, res) {
    res.send(classes);
}).post(function(req, res) {
    classes.push(req.body);
    res.send(classes);
});

// Get class info by ID
app.route('/classes/:id').get(function (req, res) {
    var info = classes.find(it => it.id == req.params.id);
    if (info) {
        res.send(info);
    } else {
        res.send("Not valid ID for class!");
    }
})

// Update class info by ID
.put(function(req, res) {
    var info = classes.find(it => it.id == req.params.id); 
    if (info) { 
        classes.forEach(function(element) { 
            if (element.id === info.id) {
                element.name = req.body.name; 
            }
        });
        res.send(classes);
    } else {
        res.send("Not valid ID for classes update!"); 
    } 
})

// Delete classes by ID
.delete(function(req, res ) {
    if (req.params.id) {
        let size = classes.length;
        for (let i = 0; i < size; ++i) {
            if (classes[i].id == req.params.id){
                classes.splice(i, 1);
                res.send(classes);
                return;
            }
        }
        res.send(classes);
    } else {
        res.send("Not valid ID for student delete!");
    }
});

// All teachers (GET / POST)
app.route('/teachers').get(function(req, res) {
    res.send(teachers);
}).post(function(req, res) {
    teachers.push(req.body);
    res.send(teachers);
});

// Get teacher info by ID
app.route('/teachers/:id').get(function (req, res) {
    var info = teachers.find(it => it.id == req.params.id);
    if (info) {
        res.send(info);
    } else {
        res.send("Not valid ID for teachers!");
    }
})

// Update teacher info by ID
.put(function(req, res) {
    var info = teachers.find(it => it.id == req.params.id); 
    if (info) { 
        teachers.forEach(function(element) { 
            if (element.id === info.id) {
                element.name = req.body.name; 
                element.surname = req.body.surname; 
            }
        });
        res.send(teachers);
    } else {
        res.send("Not valid ID for teacher update!"); 
    } 
})

// Delete teacher by ID
.delete(function(req, res ) {
    if (req.params.id) {
        let size = teachers.length;
        for (let i = 0; i < size; ++i) {
            if (teachers[i].id == req.params.id){
                teachers.splice(i, 1);
                res.send(teachers);
                return;
            }
        }
        res.send(students);
    } else {
        res.send("Not valid ID for student delete!");
    }
});

// All subjects (GET / POST)
app.route('/subjects').get(function(req, res) {
    res.send(subjects);
}).post(function(req, res) {
    res.send(subjects);
});

// Get subject info by ID
app.route('/subjects/:id').get(function (req, res) {
    var info = subjects.find(it => it.id == req.params.id);
    if (info) {
        res.send(info);
    } else {
        res.send("Not valid ID for subjects!");
    }
})

// Update subject info by ID
.put(function(req, res) {
    var info = subjects.find(it => it.id == req.params.id); 
    if (info) { 
        subjects.forEach(function(element) { 
            if (element.id === info.id) {
                element.name = req.body.name;
            }
        });
        res.send(subjects);
    } else {
        res.send("Not valid ID for subject update!"); 
    } 
})

// Delete subject by ID
.delete(function(req, res ) {
    if (req.params.id) {
        let size = subjects.length;
        for (let i = 0; i < size; ++i) {
            if (subjects[i].id == req.params.id){
                subjects.splice(i, 1);
                res.send(subjects);
                return;
            }
        }
        res.send(subjects);
    } else {
        res.send("Not valid ID for student delete!");
    }
});

app.listen(10000);
