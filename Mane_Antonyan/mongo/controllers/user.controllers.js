const user = require('../models/user.models');

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

async function updateUser(req, res) {
    if (req.body) {
        try {
            const id = req.query.id;
            const data = await user.updateOne({_id: id}, req.body, 
                {runValidators: true});
            if (data) {
                res.status(200).json({
                    message : "User with " + id + " id succesfully updated" 
                });
            } else {
                res.status(404).json({message: "User not exist!"});
            }
        } catch(err) {}       
    } else {
        res.status(202).json({message: "Empty data!"})
    }
}

module.exports.addUser = addUser;
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;