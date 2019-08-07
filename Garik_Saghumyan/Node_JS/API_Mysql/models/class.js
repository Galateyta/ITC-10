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
    switch (age) {
        case 6:
            age = 1;
            break;
        case 7:
            age = 2;
            break;
        case 8:
            age = 3;
            break;
        case 9:
            age = 4;
            break;
        case 10:
            age = 5;
            break;
        case 11:
            age = 6;
            break;
        case 12:
            age = 7;
            break;
        case 13:
            age = 8;
            break;
        case 14:
            age = 9;
            break;
        case 15:
            age = 10;
            break;
        case 16:
            age = 11;
            break;
        case 17:
            age = 12;
            break;
        default:
            console.log(age);
    }
    return new Promise((res, rej) => {
        connection.query('SELECT c.name AS className, c.grade AS classGrade, c.id, t.name AS teacherName, s.name AS subjectName FROM classes c INNER JOIN class_teachers ct ON c.id = ct.class_id INNER JOIN teachers t ON ct.teacher_id = t.id INNER JOIN subjects s ON s.id = t.subject_id WHERE c.grade = ?', age, function (error, results) {
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