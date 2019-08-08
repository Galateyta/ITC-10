const users = require('../controllers/user.controllers.js');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
        if (req.query.id) {
            users.findUsersById(req.query.id).then((data, err) => {
                if (data.length == 0) {
                    res.send("Not found")
                    return
                }
                res.send(data);
            })
            .catch((err) => {
                res.send(`User by id ${req.query.id} not found`);
            });
        } else {
            users.findUsers().then((data, err) => {
                if (data.length == 0) {
                    res.send("Not found")
                    return
                }
                res.send(data);
            })
            .catch((err) => {
                res.send(`Invalid request`);
            });
        }
    })
    .post((req, res) => {
        users.addUser(req.body).then((data, err) => {
            if (data.length == 0) {
                res.send("Not found")
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
    })
    .delete((req, res) => {
        users.deleteUser(req.query.id).then((data, err) => {
            if (data.length == 0) {
                res.send("Not found");
                return;
            }
            res.send(`User by id ${req.query.id} successfully deleted`);
        }).catch((err) => {
            res.send(`User by id ${req.query.id} not found`);
        });
    })
    .put((req, res) => {
        users.updateUser(req.query.id,req.body).then((data, err) => {
            console.log(data);
            if (data.length === 0) {
                res.send(`User by id ${req.query.id} not found`);
                return;
            }
            res.send(`User by id ${req.query.id} successfully updated`);
        })
        .catch((err) => {
            res.send(err);
        });
    });

module.exports = router;
