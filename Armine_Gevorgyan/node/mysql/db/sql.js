var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'armine',
    password: 'user',
    database: 'school'
});

connection.connect();
module.exports = connection;