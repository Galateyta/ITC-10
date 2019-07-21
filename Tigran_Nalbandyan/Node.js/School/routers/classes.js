const classes = require('../models/classes.js');
const express = require('express');
const {check, validationResult} = require('express-validator');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (req.query.id) {
      classes
        .getClasses({id: req.query.id})
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
    } else {
      classes
        .getClasses()
        .then((result) => {
          res.send(result);
        });
    }
  })
  .post((req, res) => {
    const newClass = req.body;
    classes
      .addClass(newClass)
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
    classes
      .deleteClass(req.query.id)
      .then((result) => {
        if (result.affectedRows == 0) 
          res.send(`There is no Class №${req.query.id}`);
        else 
          res.send(`Class №${req.query.id} successfully deleted`);
        }
      )
      .catch((err) => {
        res.send(`MySQL error: ${err}`);
      });
  })
  .put((req, res) => {
    let message = `There is no class ${req.query.name}`;
    // TODO: add edit functionality
    message = `Class ${req.query.name} successfully edited`;
    res.send(message);
  });

module.exports = router;