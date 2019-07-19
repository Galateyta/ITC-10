const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'School'
});

function getStudents() {
    return new Promise((res, rej) => {
        connection.query('SELECT A.id AS student_id, A.name AS student_name, A.surname, A.age, A.gender, B.name AS class_name FROM Students A INNER JOIN Classes B ON A.class_id = B.id', function (error, results, fields) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        });
    });
}

function addStudent(student) {
    return new Promise((res, rej) => {
        connection.query("INSERT INTO Students SET ?", student, function (error, results, fields) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        });
    });
}

function deleteStudent(id) {
    return new Promise((res, rej) => {
        connection.query("DELETE FROM Students WHERE id = ?", id, function (error, results, fields) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        });
    });
}

connection.connect();

// let student = {
//     name: 'aziz',
//     surname: 'zzz',
//     age: 16,
//     gender: 'female',
//     class_id: 3
// };
// addStudent(student).then((value) => {
//     console.log(value.insertId);
// });
// getStudents().then((value) => {
//     console.log(value);
// });
deleteStudent(50).then((value) => {
    console.log(value);
});

// connection.end();

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

module.exports.students = students;
module.exports.teachers = teachers;
module.exports.subjects = subjects;
module.exports.classes = classes;
module.exports.getStudents = getStudents;
module.exports.addStudent = addStudent;
