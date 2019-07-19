const connection = require('../db/mysql.js');

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

module.exports.getStudents = getStudents;
module.exports.addStudent = addStudent;
module.exports.deleteStudent = deleteStudent;