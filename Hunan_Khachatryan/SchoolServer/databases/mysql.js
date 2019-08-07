const mysql  = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hunan',
  password : 'Hunan1996',
  database : 'SchoolDB'
});

connection.connect();
module.exports = connection ;