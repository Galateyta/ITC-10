const teachers = require('../models/teachers');
const express = require('express');
const {check, validationResult} = require('express-validator');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (req.query.id) {
      teachers
        .getTeachers({id: req.query.id})
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
    } else {
      teachers
        .getTeachers()
        .then((result) => {
          res.send(result);
        });
    }
  })
  .post(function (req, res) {
    const newTeacher = req.body;
    teachers
      .addTeacher(newTeacher)
      .then((result) => {
        res.send(`Teacher ${req.body.name} added with id ${result.insertId}`);
      })
      .catch((err) => {
        res.send(`MySQL error: ${err}`);
      });
  })
  .delete([check('id', 'id is required').exists()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({
          errors: errors.array()
        });
    }
    teachers
      .deleteTeacher(req.query.id)
      .then((result) => {
        if (result.affectedRows == 0) res.send(`There is no Teacher №${req.query.id}`);
        else res.send(`Teacher №${req.query.id} successfully deleted`);
      })
      .catch((err) => {
        res.send(`MySQL error: ${err}`);
      });
  })
  .put((req, res) => {
    let message = `There is no teacher №${req.query.id}`;
    // TODO: add edit functionality
    message = `Teacher №${req.query.id} successfully edited`;
    res.send(message);
  });

module.exports = router;