const user = require('../models/user.models');
const logger = require("../app");

async function findUser(req, res) {
    if (req.query.id) {
        try {
            const data = await user.findById(req.query.id);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        try {
            const allUsers = await user.find({});
            if (allUsers) {
                res.status(200).json(allUsers);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch(err) {
            res.status(400).json(err);
        }
    }
}

async function deleteUser(req, res) {
    try {
        const data = await user.deleteOne({_id: req.query.id});
        if (data) {
            res,status(200).json({
                message: "User with " + req.query.id + "succesfully deleted"
            });
        } else {
            res.status(404).json({message: "Server not working"});
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

async function addUser(req, res) {
    if (req.body) {
        const newUser = new user(req.body);
        try {
            const data = await newUser.save();
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: "Server not working"});
            }
        } catch (err) {
            res.status(204).json(err);
        }
    } else {
        res.status(202).json({message: "Empty data!"})
    }
}
/* 
    name: {type: String, min: [3, "Minimum 3 symbols!!!"], required: true},
    role: {type: String, enum: ["admin", "user"],
            required: "please check one of 'admin', 'user'"},
    age: {type: Number, min: [16, "The user must be older than 16!!!"],
            max: [100, "The user must be younger then 100!!!"], required: true},
    gender: {type: String, enum: ["male", "female", "other"],
            required: "If you can't decide, then choose 'other')"
    },
    orders: {type: Array}
*/

async function updateUser(req, res) {
    if (req.body) {
        try {
            const id = req.query.id;
            const newName = req.body.name;
            const newRole = req.body.role;
            const newAge = req.body.age;
            const newGender = req.body.gender;
            const newOrders = req.body.orders;
            let data = 0;

            if (newGender) {
                res.status(202).json({message: "Can't change gender"});
               return;
            }

            if (newRole) {
                res.status(203).json({message: "Can't change role"});
                return;
            }

            if (newName) {
                data = await user.updateOne({_id: id}, {"name" : newName},
                    {runValidators: true});
                if (!data) {
                    res.status(404).json({message: "User not exist!"});
                    return;
                }
            }

            if (newAge) {
                data = await user.updateOne({_id: id}, {"age" : newAge},
                    {runValidators: true});
                if (!data) {
                    res.status(404).json({message: "User not exist!"});
                    return;
                    }
            }

            if (newOrders) {
                data = await user.updateOne({_id: id}, {$push : {"name" : newName}});
                if (!data) {
                    res.status(404).json({message: "User not exist!"});
                    return;
                }
            }

            res.status(200).json({
                message : "User with " + id + " id succesfully updated" 
            });
        } catch(err) {
            res.status(404).json(err);
        }
    } else {
        res.status(202).json({message: "Empty data!"})
    }
}

module.exports.addUser = addUser;
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;