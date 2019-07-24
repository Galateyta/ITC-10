const users = require('../controllers/users.cont');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(users.getUsers)
    .post(users.addUser)
    router.put('/:id', users.updateUser)
    router.delete('/:id', users.deleteUser)
    router.get('/:id', users.getUser)

module.exports = router;