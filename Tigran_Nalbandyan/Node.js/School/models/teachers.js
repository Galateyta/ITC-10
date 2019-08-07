const connection = require('../db/mysql.js');

function getTeachers({id = null, classId = null} = {id: null, classId: null}) {
  return new Promise((res, rej) => {
    let query = id
      ? `SELECT A.id AS teacher_id, A.name AS teacher_name, A.surname, A.age, A.address, A.phone, B.name AS subject FROM Teachers A INNER JOIN Subject B ON A.subject_id = B.id WHERE A.id = ${id}`
      : `SELECT A.id AS teacher_id, A.name AS teacher_name, A.surname, A.age, A.address, A.phone, B.name AS subject FROM Teachers A INNER JOIN Subject B ON A.subject_id = B.id`;
    if (classId) {
      query = `SELECT B.name, B.surname, B.age, B.address, B.phone FROM Class_teacher A INNER JOIN Teachers B ON A.teacher_id = B.id WHERE A.class_id = 4`;
    }
      connection.query(query, function (error, results) {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    });
  });
}
function addTeacher(teacher) {
  return new Promise((res, rej) => {
    connection
      .query("INSERT INTO Teachers SET ?", teacher, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

function deleteTeacher(id) {
  return new Promise((res, rej) => {
    connection
      .query("DELETE FROM Teachers WHERE id = ?", id, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

module.exports.getTeachers = getTeachers;
module.exports.addTeacher = addTeacher;
module.exports.deleteTeacher = deleteTeacher;