const users = require('../controllers/users.cont');
const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
        users.findUsers().then((data, err) => {
            if (data.length == 0) {
                res.send("No record found")
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(`Invalid request`);
        });
    })
    .get('/:id', (req, res) => {
        users.findUsersById(req.params.id).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found")
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(`${req.params.id} not found`);
        });
    })
    .post((req, res) => {
        users.addUser(req.body).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found")
                return
            }
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
    })
    .delete('/:id', (req, res) => {
        users.deleteUser(req.params.id).then((data, err) => {
            if (data.length == 0) {
                res.send("No record found");
                return;
            }
            res.send(`User by id ${req.query.id} successfully deleted`);
        }).catch((err) => {
            res.send(`${req.params.id} not found`);
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
