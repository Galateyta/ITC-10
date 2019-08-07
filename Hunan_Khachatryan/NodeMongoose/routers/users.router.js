const express = require('express');
const users = require('../controlers/users.controlers');
const addAdmin = require('../middlewares/users.middleware').addAdmin
const router = express.Router();

router.route('/')
    .get(users.getAllUsers)
    .post(addAdmin, users.addUser)

router.route('/:id')
    .get(users.getUserByID)
    .put(addAdmin, users.updateUser)
    .delete(users.removeUser)

module.exports = router;