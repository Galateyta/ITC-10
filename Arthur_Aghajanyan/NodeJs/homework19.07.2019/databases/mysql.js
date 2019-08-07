const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'abul93',
  database : 'School'
});
 
connection.connect();
module.exports = connection;
