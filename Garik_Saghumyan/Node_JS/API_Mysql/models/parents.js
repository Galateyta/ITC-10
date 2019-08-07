const connection = require("../db/sql");
function insertParent(parent) {
    return new Promise((res, rej) => {
        connection.query('INSERT INTO parents SET ?', parent, function (error, results) {
            if (error) {
                return rej(error)
            } else {
                return res(results);
            }
        });
    })
};

module.exports.insertParent = insertParent;
