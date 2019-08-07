const classes = require('../models/classes.js');
const students = require('../models/students.js');

function chooseClass(age) {
  let classNumber = age - 5;
  let classLetter;
  let classId;
  return new Promise((res, rej) => classes.getClasses({number: classNumber}).then((result) => {
    for (const classInfo of result) {
      classLetter = classInfo.name;
      if (classInfo.student_count < 15) {
        classId = classInfo.id;
        break
      }
    }
    if (!classId) {
      if (classLetter) {
        classLetter = String.fromCharCode(classLetter.charCodeAt(0) + 1);
      } else {
        classLetter = 'A';
      }
      const newClass = {
        number: classNumber,
        name: classLetter,
        student_count: 0,
        school_id: 1
      };
      classes
        .addClass(newClass)
        .then((result) => {
          classId = result.insertId;
          res({classId, className: `${classNumber}${classLetter}`});
        })
        .catch((error) => rej(error));
    } else {
      res({classId, className: `${classNumber}${classLetter}`});
    }
  }).catch((error) => rej(error)));
}

function updateStudentCount() {
  students
    .getStudentCount()
    .then((countResult) => {
      classes
        .getClasses()
        .then((result) => {
          for (const classInfo of result) {
            let found = false;
            for (const countInfo of countResult) {
              if (classInfo.id === countInfo.class_id) {
                found = true;
                if (classInfo.student_count !== countInfo.student_count) {
                  classes.editClass(classInfo.id, {student_count: countInfo.student_count});
                  break;
                }
              }
            }
            if (!found) {
              classes.editClass(classInfo.id, {student_count: 0});
            }
          }
        });
    });
}

module.exports.chooseClass = chooseClass;
module.exports.updateStudentCount = updateStudentCount;