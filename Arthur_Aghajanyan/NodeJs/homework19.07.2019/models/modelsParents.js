const connection = require('../databases/mysql');

module.exports.getParents = function(){
    return new Promise((res, rej) => {
        connection.query('SELECT * FROM Parents',function(error, results) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        })
    })
}

module.exports.insertParents = function(parentsOne){
    return new Promise((res, rej) => { 
        connection.query('INSERT INTO Parents SET ?', parentsOne, function(error, results) {
            if (error) {
                rej(error);
            } else {
                res(results);
            }
        })
    })
}

