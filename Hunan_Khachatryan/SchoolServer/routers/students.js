const express = require('express');
const { check ,validationResult,oneOf} = require('express-validator');
const student = require('../models/students');
const admit = require('../controlers/students')
const router = express.Router();

router.route('/')
  .get( function (req, res) {
      student.getStudents()
      .then(
        (result) => {       
            res.send(result);
        })
        .catch(
            (error) => {
                res.status(404);
                res.send(error); 
        }
    )
    
  })
  
.post( [
    check('Name')
        .not().isEmpty().withMessage('The First name is required')
        .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Name must started upper simbols '),
    check('Surename')
        .not().isEmpty().withMessage('The Last name is required')
        .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('SureName must started upper simbols '),
    check('Age')
        .not().isEmpty().withMessage('The age is required')
        .isInt({gt:5, lt:18}).withMessage('Students age wil be in range 6-17'),
    check('Gender')
        .not().isEmpty().withMessage('The age is required')
        .isIn(['male','female']).withMessage('Gender is not validate'),
    check('classID')
        .not().isEmpty().withMessage('The classid is required')
        .matches(/^[0-9]{1,2}/).withMessage('Class id  must be maximum two number '),
], (req, res) => {
      const errors = validationResult(req);
      console.log
    if ( !errors.isEmpty()){
        res.status(404);
        res.send(errors);
    }else{
        student.insertUser(req.body)
        .then(
            (result) => {  
                var resul = req.body;
                resul.id = result.insertId;     
                res.send(resul);
            })
            .catch(
                (error) => {
                    res.status(404);
                    res.send(error); 
            }
        )
    }
  });
router.get('/:id',function(req, res){
        var item= student.students.find(x => x.id == req.params.id);

     if (item){
             
        res.send(item);
          }else{
            res.send("Not found student by following id");
          }
   })
   
router.post('/admit',[
check('Name')
  .not().isEmpty().withMessage('The First name is required')
  .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Name must started upper simbols '),
check('Surename')
  .not().isEmpty().withMessage('The Last name is required')
  .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('SureName must started upper simbols '),
check('Age')
  .not().isEmpty().withMessage('The age is required')
  .isInt({gt:5, lt:18}).withMessage('Students age wil be in range 6-17'),
check('Gender')
  .not().isEmpty().withMessage('The age is required')
  .isIn(['male','female']).withMessage('Gender is not validate'),
check('pName')
  .not().isEmpty().withMessage('The First name is required')
  .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('Name must started  from upper simbol'),
check('pSurename')
  .not().isEmpty().withMessage('The Last name is required')
  .matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('SureName must started  from upper simbol'),
check('pPhone')
  .not().isEmpty().withMessage('The Phone is required')
  .isInt().withMessage('Students age wil be in digites')
  .matches(/^[0-9]{8}/).withMessage('Phone number example. 98754786 '),
check('pEmail')
  .not().isEmpty().withMessage('The Email is required')
  .isEmail().withMessage('Email is not validate  example. name_surename@mail.ru '),

], function (req, res){
  const errors = validationResult(req);
      
  if ( !errors.isEmpty()){
      res.status(404);
      res.send(errors);
  }else{
  admit.studentAdmit(req.body)
  .then(result=>{
    res.send(result);
  })
  .catch(error=>{
    res.status(404);
    res.send(error); 
  })

}
});
module.exports = router;