const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a28762',
  database : 'school'
});
 
connection.connect();
module.exports = connection;