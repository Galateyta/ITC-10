const connection = require("../db/sql");

function getStudents() {
    return new Promise((res, rej) => {
        connection.query('SELECT s.name, s.surname, s.age , s.gender, p.name, p.surname, p.phone  FROM students s INNER JOIN parents p ON s.id = p.student_id', function (error, results) {
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
};
function getStudentsById(id) {
    return new Promise((res, rej) => {
        connection.query('SELECT * FROM students WHERE id = ?',id, function (error, results) {
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
};
function insertStudent(student) {
    return new Promise((res, rej) => {
        connection.query('INSERT INTO students SET ?', student, function (error, results) {
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
}
module.exports.insertStudent = insertStudent;
module.exports.getStudents = getStudents;
module.exports.getStudentsById = getStudentsById;