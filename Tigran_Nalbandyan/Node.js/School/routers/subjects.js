const subjects = require('../models/subjects.js');
const express = require('express');
const {check, validationResult} = require('express-validator');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (req.query.id) {
      subjects
        .getSubjects({id: req.query.id})
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
    } else {
      subjects
        .getSubjects()
        .then((result) => {
          res.send(result);
        });
    }
  })
  .post((req, res) => {
    const newSubject = req.body;
    subjects
      .addSubject(newSubject)
      .then((result) => res.send(`${newClass} successfully added`))
      .catch((error) => res.send(error))
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
    subjects
      .deleteSubject(req.query.id)
      .then((result) => {
        if (result.affectedRows == 0) res.send(`There is no Subject №${req.query.id}`);
        else res.send(`Subject №${req.query.id} successfully deleted`);
      })
      .catch((err) => {
        res.send(`MySQL error: ${err}`);
      });
  })
  .put((req, res) => {
    let message = `There is no subject №${req.query.id}`;
    // TODO: add edit functionality
    message = `Subject №${req.query.id} successfully edited`;
    res.send(message);
  });

module.exports = router;