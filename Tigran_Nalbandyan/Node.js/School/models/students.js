const connection = require('../db/mysql.js');

function getStudents({
  id = null
} = {
  id: null
}) {
  return new Promise((res, rej) => {
    const query = id
      ? `SELECT A.id AS student_id, A.name AS student_name, A.surname, A.age, A.gender, B.name AS class_name FROM Students A INNER JOIN Classes B ON A.class_id = B.id WHERE A.id = ${id}`
      : `SELECT A.id AS student_id, A.name AS student_name, A.surname, A.age, A.gender, B.name AS class_name FROM Students A INNER JOIN Classes B ON A.class_id = B.id`;
    connection.query(query, function (error, results) {
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
    connection
      .query("INSERT INTO Students SET ?", student, function (error, results) {
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
    connection
      .query("DELETE FROM Students WHERE id = ?", id, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

function getStudentCount() {
  return new Promise((res, rej) => {
    const query = `SELECT class_id, COUNT(name) AS student_count FROM Students GROUP BY class_id;`;
    connection.query(query, function (error, results) {
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
module.exports.getStudentCount = getStudentCount;