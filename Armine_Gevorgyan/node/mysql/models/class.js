const connection = require("../db/sql");
function getClasses(){
    return new Promise((res, rej) => {
        connection.query('SELECT  * FROM classes', function (error, results) {
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
}

function getClassesId(age) {
    age = age - 5;
    return new Promise((res, rej) => {
        connection.query('SELECT c.name, c.grade, c.id, t.name, s.name FROM classes c INNER JOIN class_teachers ct ON c.id = ct.class_id INNER JOIN teachers t ON ct.teacher_id = t.id INNER JOIN subjects s ON s.id = t.subject_id WHERE c.grade = ?', age, function (error, results) {
            console.log(age);
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
};

function insertClass(clas) {
    return new Promise((res, rej) => {
        connection.query('INSERT INTO classes SET ?', clas, function (error, results) {
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
}
module.exports.getClassesId = getClassesId;
module.exports.insertClass = insertClass;
module.exports.getClasses = getClasses;