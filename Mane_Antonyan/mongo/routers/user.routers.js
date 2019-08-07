const users = require("../controllers/user.controllers");
const express = require("express");
const router = express.Router();

// Find user by ID / Find all users
router.route('/').get((req, res) => { 
    if (req.query.id) {
        users.findUsersById(req.query.id).then((data, error) => {
            if (data.length == 0) {
                res.send("Empty data!")
            } else {
                res.send(data);
            }
        }).catch((error) => {
            res.send("User with id " + req.query.id + " not found");
        });
    } else {
        users.findAllUsers().then((data, error) => {
            if (data.length == 0) { 
                res.send("Empty data!")
            } else {
                res.send(data);
            }
        }).catch((error) => {
            res.send("Server not working");
        });
    }

// Add new user
}).post((req, res) => {
    users.addOneUser(req.body).then((data, error) => {
        if (data.length == 0) {
            res.send("Empty data!")
        } else {
            res.send(data);
        }
    }).catch((error) => {
        res.send(error);
    });

// Delet user by ID
}).delete((req, res) => {
    users.deleteOneUser(req.query.id).then((data, error) => {
        if (data.length == 0) {
            res.send("Empty data!");
        } else {
            res.send("Succesfuly deleted!");
        }
    }).catch((error) => {
        res.send("User with id " + req.query.id + " not found");
    });

// Update user
}).put((req, res) => {
    users.updateOneUser(req.query.id,req.body).then((data, error) => {
        if (data.length === 0) {
            res.send("User with id " + req.query.id + " not found");
            return;
        } 
        res.send("successfully updated");
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;