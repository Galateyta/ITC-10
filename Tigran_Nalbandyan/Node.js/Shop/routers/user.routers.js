const users = require('../controllers/user.controllers.js');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(users.getUsers)
    .post(users.addUser)
    .delete(users.deleteUser)
    .put(users.updateUser);

module.exports = router;