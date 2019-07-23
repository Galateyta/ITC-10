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
        const user = new User({name: req.body.name, age: req.body.age, gender: req.body.gender, orders: req.body.orders});
        user.save();
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports.getUserById = function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return res.status(400).json(err);
        res.status(200).json(user);
    });
}

module.exports.putUserById = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    User.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, user){
        if(err) return res.status(400).json(err);
        res.status(200).json(user);
    });
}

module.exports.deleteUserById = function(req, res){
         
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
                
        if(err) return res.status(400).json(err);
        res.status(200).json(user);
    });
}