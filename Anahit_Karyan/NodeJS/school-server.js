let express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let students = [
    {
     id : 1,
     name : 'Name1',
     surname : 'Surname1',
     age : 16,
     classId : 1
    },
    {
     id : 2,
     name : 'Name2',
     surname : 'Surname2',
     age : 19,
     classId : 2
    },
    {
     id : 3,
     name : 'Name3',
     surname : 'Surname3',
     age : 20,
     classId : 3
    }
];

let teachers = [
    {
     id : 1,
     name : 't1',
     surname : 'ts1',
     age : 30
    },
    {
     id : 2,
     name : 't2',
     surname : 'ts2',
     age : 40
    },
    {
     id : 3,
     name : 't3',
     surname : 'ts3',
     age : 20
    }
];

let subjects = [
    {
     id : 1,
     name : 'subject1',
    },
    {
     id : 2,
     name : 'subject2',
    },
    {
     id : 3,
     name : 'subject3',
    }
];

let classes = [
    {
     id : 1,
     name : '7a',
    },
    {
     id : 2,
     name : '8b',
    },
    {
     id : 3,
     name : '3a',
    }
];

function changeStudentInfo (student, res, req) {
    students.forEach(function(item){ 
        if (item.id === student.id){
            item.name = req.body.name; 
            item.surname = req.body.surname; 
            item.age = req.body.age;
            item.classId = req.body.classId;
        }
    });
    res.send(students);
};

function changeTeacherInfo (teacher, res, req) {
    teachers.forEach(function(item){ 
        if (item.id === teacher.id){
            item.name = req.body.name; 
            item.surname = req.body.surname; 
            item.age = req.body.age;
        }
    });
    res.send(teachers);
}

function changeClassInfo (classt, res, req) {
    classes.forEach(function(item){ 
        if (item.id === classt.id){
            item.name = req.body.name; 
        }
    });
    res.send(classes);
}

function changeSubjectInfo (subject, res, req) {
    subjects.forEach(function(item){ 
        if (item.id === subject.id){
            item.name = req.body.name; 
        }
    });
    res.send(subjects);
}
app.use(function (req, res, next) {
    if (req.headers.authorization !== 'ITC10') {
        res.send("Headers authorization not a ITC10");
    }
    next();
});

app.route('/students')
.get(function(req, res) {
	res.send(students);
})
.post(function(req, res) {
	students.push(req.body);
	res.send(students);
});

app.route('/teachers')
.get(function(req, res) {
	res.send(teachers);
})
.post(function(req, res) {
	teachers.push(req.body);
	res.send(teachers);
});

app.route('/classes')
.get(function(req, res) {
	res.send(classes);
})
.post(function(req, res) {
	classes.push(req.body);
	res.send(classes);
});

app.route('/subjects')
.get(function(req, res) {
	res.send(subjects);
})
.post(function(req, res) {
	subjects.push(req.body);
	res.send(subjects);
});



app.route('/students/:id')
.get(function (req, res) {
	let student = students.find(item => item.id == req.params.id);
	student ? res.send(student) : res.send("Not student");
})
.put(function(req, res ) { 
    var student = students.find(item => item.id == req.params.id); 
    student ? changeStudentInfo(student, res, req) : res.send("Not student"); 
})
.delete(function(req, res ) {
    let student = students.find(item => item.id == req.params.id);
	if (student) {        
        students.forEach(function(item, index){ 
            if (item.id === student.id){
                students.splice(index, 1)
            }
        });
		res.send(students);
	} else {
		res.send("Not student");
    }
});

app.route('/teachers/:id')
.get(function (req, res) {
	let teacher = teachers.find(item => item.id == req.params.id);
	teacher ? res.send(teacher) : res.send("Not teacher");
})
.put(function(req, res ) { 
    let teacher = teachers.find(item => item.id == req.params.id); 
    teacher ? changeTeacherInfo(teacher, res, req) : res.send("Not teacher");      
})
.delete(function(req, res ) {
    let teacher = teachers.find(item => item.id == req.params.id);
	if (teacher) {        
        teachers.forEach(function(item, index){ 
            if (item.id === teacher.id){
                teachers.splice(index, 1)
            }
        });
		res.send(teachers);
	} else {
		res.send("Not teacher");
    }
});

app.route('/classes/:id')
.get(function (req, res) {
	let classt = classes.find(item => item.id == req.params.id);
	classt ? res.send(classt) : res.send("Not class");
})
.put(function(req, res ) { 
    var classt = classes.find(item => item.id == req.params.id); 
    classt ? changeClassInfo(classt, res, req) : res.send("Not class"); 
})
.delete(function(req, res ) {
    let classt = classes.find(item => item.id == req.params.id);
	if (classt) {        
        classes.forEach(function(item, index){ 
            if (item.id === classt.id){
                classes.splice(index, 1);
            }
        });
		res.send(classes);
	} else {
		res.send("Not class");
    }
});

app.route('/subjects/:id')
.get(function (req, res) {
	let subject = subjects.find(item => item.id == req.params.id);
	subject ? res.send(subject) : res.send("Not subject");
})
.put(function(req, res ) { 
    var subject = subjects.find(item => item.id == req.params.id); 
    subject ? changeSubjectInfo(subject, res, req) : res.send("Not subject"); 
})
.delete(function(req, res ) {
    let subject = subjects.find(item => item.id == req.params.id);
	if (subject) {        
        subjects.forEach(function(item, index){ 
            if (item.id === subject.id){
                subjects.splice(index, 1);
            }
        });
		res.send(subjects);
	} else {
		res.send("Not subject");
    }
});

app.listen(60011);
