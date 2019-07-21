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

module.exports.getStudentsById = function(id) {
	return new Promise (function (res, rej) {
							connection.query(`SELECT * FROM Students WHERE id=${id}`, function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}

module.exports.putStudentsById = function(id, body) {
	return new Promise (function (res, rej) { console.log(body);
							connection.query(`UPDATE Students  SET name=${body.name}, surname=${body.surname}, age=${body.age}, gender=${body.gender}, class_id=${body.class_id} WHERE id=${id}`, function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}

module.exports.deleteStudentsById = function(id) {
	return new Promise (function (res, rej) {
							connection.query(`DELETE FROM Students WHERE id=${id}`, function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}

module.exports.setStudentParent = function (parent) {
	return new Promise (function (res, rej) { console.log(parent);
							connection.query('INSERT INTO Parents SET ? ', parent , function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}
