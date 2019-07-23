const express = require('express');
const router = express.Router();
const controlellers = require('../controllers/userInControllers');
router.route('/')
.get(controlellers.getAllUsers)
.post(controlellers.postUser);

router.route('/:id')
.get(controlellers.getUserById)
.put(controlellers.putUserById)
.delete(controlellers.deleteUserById);

module.exports = router; 