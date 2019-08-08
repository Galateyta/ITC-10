const connection = require('../db/mysql.js');

function getClasses({id = null, number = null} = {id: null, number: null}) {
  return new Promise((res, rej) => {
    const query = id
      ? number ? `SELECT * FROM Classes WHERE id = ${id}, number = ${number}` : `SELECT * FROM Classes WHERE id = ${id}`
      : number ? `SELECT * FROM Classes WHERE number = ${number}` : `SELECT * FROM Classes`;
      connection.query(query, function (error, results) {
      if (error) {
        rej(error);
      } else {
        res(results);
      }
    });
  });
}

function addClass(newClass) {
  return new Promise((res, rej) => {
    connection
      .query("INSERT INTO Classes SET ?", newClass, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

function deleteClass(id) {
  return new Promise((res, rej) => {
    connection
      .query("DELETE FROM Classes WHERE id = ?", id, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

function editClass(id, newClass) {
  return new Promise((res, rej) => {
    connection
      .query(`UPDATE Classes SET ? WHERE id = ${id}`, newClass, function (error, results) {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      });
  });
}

module.exports.getClasses = getClasses;
module.exports.addClass = addClass;
module.exports.deleteClass = deleteClass;
module.exports.editClass = editClass;