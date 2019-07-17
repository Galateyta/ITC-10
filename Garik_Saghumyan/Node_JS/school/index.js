var db = require("./fakedb");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
        res.send('Incalid authorization')
    }
    next();
});
app.route('/students')
    .get(function (req, res) {
        res.send(db.students);
    })
    .post(function (req, res) {
        db.students.push(req.body)
        res.send(db.students);
    })
    .put(function (req, res) {
        res.send('Update the students');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /student');
    });
app.get('/students/:id', function (req, res, next) {
    db.students.forEach(function (student) {
        if (req.params.id == student.id) {
            res.send(student);
        }
    });
    next();
});
app.get('/teachers/:id', function (req, res, next) {
    db.teachers.forEach(function (teacher) {
        if (req.params.id == teacher.id) {
            res.send(teacher);
        }
    });
    next();
});
app.get('/subjects/:id', function (req, res, next) {
    db.subjects.forEach(function (subject) {
        if (req.params.id == subject.id) {
            res.send(subject);
        }
    });
    next();
});
app.get('/classes/:id', function (req, res, next) {
    db.classes.forEach(function (clas) {
        if (req.params.id == clas.id) {
            res.send(clas);
        }
    });
    next();
});

app.route('/teachers')
    .get(function (req, res) {
        res.send(db.teachers);
    })
    .post(function (req, res) {
        db.teachers.push(req.body)
        res.send(db.teachers);
    })
    .put(function (req, res) {
        res.send('Update the teachers');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /teacher');
    });
app.route('/subjects')
    .get(function (req, res) {
        res.send(db.subjects);
    })
    .post(function (req, res) {
        db.subjects.push(req.body)
        res.send(db.subjects);
    })
    .put(function (req, res) {
        res.send('Update the subjects');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /subject');
    });
app.route('/classes')
    .get(function (req, res) {
        db.classes.forEach(function (clas) {
            if (req.query.grade == clas.grade) {
                res.send(clas);
            }
        });
        res.send(db.classes);
    })
    .post(function (req, res) {
        db.classes.push(req.body)
        res.send(db.classes);
    })
    .put(function (req, res) {
        res.send('Update the classes');
    }) 
    .delete(function (req, res) {
        res.send('Got a DELETE request at /class');
    });

app.listen(10000);