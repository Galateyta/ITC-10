const user = require("../controllers/user.controllers");
const logger = require("../app");
const express = require("express");
const router = express.Router();

router.route('/').get(user.findUser)
.post(user.addUser)
.delete(user.deleteUser)
.put(user.updateUser);

module.exports = router;