const student = require('../models/studentsInModels');
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = express.Router();
const connection = require('../databases/mySql');

router.route('/')
.post(function(req, res) {
   		const errors = validationResult(req);
        if (!errors.isEmpty()) {
  	   		return res.status(422).jsonp(errors.array());
		} else {   
            const studentInfoObj = JSON.parse(req.body.studentInfo);
            const parentInfoObj = JSON.parse(req.body.parentInfo);
            const onClassToAge = { 
                                  '6' : 1,
                                  '7' : 2,
                                  '8' : 3,
                                  '9' : 4,
                                  '10' : 5,
                                  '11' : 6,
                                  '12' : 8,
                                  '13' : 9,
                                  '14' : 10,
                                  '15' : 11,
                                  '16' : 12
                                  }
            const classNumber = onClassToAge[studentInfoObj.age];
            let classId ;
            let p = new Promise (function (res, rej) { 
                            connection.query(`select id from Classes where classNumber=${classNumber} and className='b'` , function (error, results, fields) {
                                if (error) {
                                    rej(error);
                                } else { console.log(results);
                                    classId = results;
                                    res(results);
                                }
                            });
                        });

            var student;
            console.log(classId);
            studentInfoObj.class_id = classNumber;//heto uxxel classId sarqel--------------------------------------------
            p.then((value)=> {
                console.log("Then is Ok");
            }).catch( (error)=> {
                console.log("Error in promiss" + error);
                res.send(error);
            })

			student.setStudents(studentInfoObj).then((value)=> {console.log(studentInfoObj)
				//const student = {...studentInfoObj, id : value.insertId};
                student = studentInfoObj;
                student[id] = value.insertId;
                //student[class_id] = 8;
                console.log(student);
				res.send(student);
			}).catch( (error)=> {
				console.log("Error in queri Insert" + error);
				res.send(error);
			})

            /*student.setStudentsParent(parentInfoObj).then((value)=> {
                //const student = {...studentInfoObj, id : value.insertId};
                var parent = parentInfoObj;
                parent[id] = value.insertId;
                parent[student_id] = student.id;
                console.log(parent);
                res.send(parent);
            }).catch( (error)=> {
                console.log("Error in queri Insert" + error);
                res.send(error);
            })*/
		}
});

module.exports = router; 