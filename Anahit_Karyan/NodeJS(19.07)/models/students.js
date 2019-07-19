const connection = require('../databases/mySql');

module.exports.getStudents = function() {
	return new Promise (function (res, rej) {
							connection.query('SELECT * FROM Students', function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}

module.exports.setStudents = function (student) {
	return new Promise (function (res, rej) { console.log(student);
							connection.query('INSERT INTO Students SET ? ', student , function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}