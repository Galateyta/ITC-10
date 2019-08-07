const db = require("./fakedb");
const express = require('express');
const app = express();
const { check, validationResult, oneOf } = require('express-validator')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
        res.send('Invalid authorization');
        return;
    }
    next();
});
app.route('/students')
    .get(function (req, res) {
        res.send(db.students);
    })
    .post([
        check('firstname').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('firstnames first simbol must upper'),
        check('lastname').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('lasttnames first simbol must upper'),
        check('age').isInt({ gt: 6, lt: 30 }).withMessage('age must be in range [6, 30]'),
        check('email').isEmail().normalizeEmail().withMessage('mail must be like this example@gmail.com'),
        check('gender').isIn(['male', 'female']).withMessage('gender must be male or female'),
        oneOf([[
            check('gender').equals('male'),
            check('carNumber').matches(/^[0-9]{2}[A-Z]{2}[0-9]{3}$/).withMessage('carNumber for male person must be like Armenian car numbers')
        ], [
            check('gender').equals('female')
        ]])
    ], function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            db.students.push(req.body)
            let newStudent = req.body;
            // res.send(db.students);
            res.send({message: "Student successfully added!", newStudent });
        }

    })
    .put(function (req, res) {
        res.send('Update the students');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /student');
    });
app.get('/students/:id', function (req, res, next) {
    newStudents = [];
    db.students.forEach(function (student) {
        if (req.params.id == student.id) {
            newStudents.push(student);
        }
    });
    res.send(newStudents);
    next();
});
app.get('/teachers/:id', function (req, res, next) {
    newTeachers = [];
    db.teachers.forEach(function (teacher) {
        if (req.params.id == teacher.id) {
            newTeachers.push(teacher);
        }
    });
    res.send(newTeachers)
    next();
});
app.get('/subjects/:id', function (req, res, next) {
    newSubjects = [];
    db.teachers.forEach(function (subject) {
        if (req.params.id == subject.id) {
            newSubjects.push(subjects);
        }
    });
    res.send(newSubjects)
    next();
});
app.get('/classes/:id', function (req, res, next) {
    newClasses = [];
    db.teachers.forEach(function (clas) {
        if (req.params.id == clas.id) {
            newClasses.push(subjects);
        }
    });
    res.send(newClasses)
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
module.exports = app;