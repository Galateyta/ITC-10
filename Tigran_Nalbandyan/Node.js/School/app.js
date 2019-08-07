const express = require('express');
const bodyParser = require('body-parser');

const students = require('./routers/students.js');
const teachers = require('./routers/teachers.js');
const subjects = require('./routers/subjects.js');
const classes = require('./routers/classes.js');
  
const app = express();
const port = 8000;

app.use((req, res, next) => {
  if (req.headers.authorization !== 'ITC10') {
    res.statusCode = 401;
    res.end('401 Unauthorized\nAccess denied');
  } else {
    next();
  }
})
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use('/students', students);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/classes', classes);

app.listen(port, () => console.log(`School server listening on port ${port}`));

module.exports = app; // for testing