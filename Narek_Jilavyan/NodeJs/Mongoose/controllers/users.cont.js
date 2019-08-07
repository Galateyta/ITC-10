const User = require('../models/users.mod');

async function getUsers(req, res){
    try {
        const data = await User.find({});
        if (data.length == 0) {
            res.status(200).json({"result" : "data is empty"});
            return
        }
        res.send(data);
    }
    catch{
        res.status(400).json({"error" : "Invalid request"});
    }
}

async function getUser(req, res){
    try {
        const data = await User.findById(req.params.id);
        if (data.length == 0) {
            res.status(200).json({"result" : "data is empty"});
            return
        }
        res.send(data);
    }
    catch{
                res.status(400).json({"error" : "Invalid request"});
    }
}

async function addUser(req, res){
    try {
        var newUser = new User(req.body);
        result = await newUser.save();
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }
}

async function updateUser(req, res){
    try {
        result = await User.updateOne({ _id: req.params.id}, req.body , {runValidators: true}).exec();
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    }  
}

async function deleteUser(req, res){
    try {
        result = await User.deleteOne({_id: req.params.id})
        res.status(200).json(result);
    }
    catch {
        res.status(400).json({"error": "invalid body"});
    } 
}

module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;