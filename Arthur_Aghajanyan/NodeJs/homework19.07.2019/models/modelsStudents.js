const connection = require('../databases/mysql');

module.exports.getStudents = function(){
    return new Promise((res, rej) => {
        connection.query('SELECT * FROM Students',function(error, results) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        })
    })
}

module.exports.insertStudents = function(studentsOne){
    return new Promise((res, rej) => { 
        connection.query('INSERT INTO Students SET ?', studentsOne,function(error, results) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        })
    })
}

module.exports.getStudentById = function(id){
    return new Promise((res, rej) => { 
        connection.query('SELECT * FROM Students WHERE id = ?', id,function(error, results) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        })
    })
}

