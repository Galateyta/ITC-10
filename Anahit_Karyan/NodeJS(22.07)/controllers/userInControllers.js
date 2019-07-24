const User = require('../models/usersInModels')

module.exports.getAllUsers = async function(req, res){      
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.postUser = async function (req, res) {
    if(!req.body) return res.sendStatus(400);  
    try {
        const user = new User({name: req.body.name, age: req.body.age, gender: req.body.gender, orders: req.body.orders, role: req.body.role});
        user.save();
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.getUserById = async function(req, res){      
    const id = req.params.id;
    try {
        const user =  await User.findOne({_id: id});
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.putUserById = async function(req, res){   
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.deleteUserById = async function(req, res){
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}