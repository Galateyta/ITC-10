const connection = require('../db/mysql.js');

function getSubjects({id = null} = {id: null}) {
  return new Promise((res, rej) => {
    const query = id
      ? `SELECT * FROM Subjects WHERE id = ${id}`
      : `SELECT * FROM Subjects`;
    connection.query(query, function (error, results) {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    });
  });
}

function addSubject(subject) {
  return new Promise((res, rej) => {
    connection
      .query("INSERT INTO Subjects SET ?", subject, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

function deleteSubject(id) {
  return new Promise((res, rej) => {
    connection
      .query("DELETE FROM Subjects WHERE id = ?", id, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

module.exports.getSubjects = getSubjects;
module.exports.addSubject = addSubject;
module.exports.deleteSubject = deleteSubject;