const student = require("../models/modelsStudents");
const parent = require("../models/modelsParents");
const express = require('express');
const { check, validationResult, oneOf } = require('express-validator');
const router = express.Router();


router.route('/')
.get(function(req, res) {

    student.getStudents()
    .then((value)=> {
        res.send(value);  // resultna models_i
    })
    .catch((error)=>{
        console.log("there are errors in query ->: " + error);
    }) 
})
.post(check('studentBody.name')
    .isLength({ min:3 })
    .matches(/^[A-Z]{1}[a-z]{1,}$/),    
    check('studentBody.surname')
        .isLength({ min:6 })
        .matches(/^[A-Z]{1}[a-z]{1,}$/),
    check('studentBody.age')
        .isInt({ gt: 6, lt: 12 }),
    check('studentBody.gender')
        .isIn(['male', 'female']),
      
    function(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
        } else {
                let studentPost = {};
                switch(req.body.studentBody.age) {
                    case 7:
                        studentPost = {...req.body.studentBody,class_id: 1};
                        break;
                    case 8:
                        studentPost = {...req.body.studentBody,class_id: 2};
                        break;
                    case 9:
                        studentPost = {...req.body.studentBody,class_id: 3};
                        break;
                    case 10:
                        studentPost = {...req.body.studentBody,class_id: 4};
                        break;
                    case 11:
                        studentPost = {...req.body.studentBody,class_id: 5};
                        break;
                }
            student.insertStudents(studentPost)
            .then((value)=> {                                    
                const student1 = {...studentPost ,id : value.insertId};

                const parentPost = {...req.body.parentBody, student_id : student1.id}
                parent.insertParents(parentPost)
                .then((value)=> {
                                               
                    const parent1 = {...parentPost ,id : value.insertId};
                    const commonInfo = {"parent" : parent1,"studnet" : student1}
                    res.send(commonInfo); 
                })
            .   catch((error)=>{
                    console.log("there are errors in query ->: " + error);
                })

            })
            .catch((error)=>{
                console.log("there are errors in query ->: " + error);
            })
    }
})

router.route('/:id')
.get(function (req, res) {

student.getStudentById(req.params.id)
    .then((value)=> {
        res.send(value); 
    })
    .catch((error)=> {
        console.log("there are errors in query ->: " + error);
    }) 
})

.put(function(req, res ) { 
    const item= student.students.find(elem => elem.id == req.params.id); 
    if (item) { 
		student.students.forEach(function(element){ 
	    	if (element.id === item.id){
 				element.name = req.body.name; 
				element.surname = req.body.surname; 
			}
		}) 
		res.send(student.students);
 	} else { 
		res.send("there is not student with mantioned id for put"); 
	} 
})
.delete(function(req, res ) {
    for(let j = 0; j < student.students.length; j++){
        if(student.students[j].id == req.params.id){
            student.students.splice(j,1);
            res.send(student.students);
            return;
	    }
    }
    res.send("there is not student with mantioned id for delete");     
})

module.exports = router;

