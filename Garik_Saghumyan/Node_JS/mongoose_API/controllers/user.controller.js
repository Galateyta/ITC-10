const User = require('../models/user.model');
let userPostFunction = async function(req, res){
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const userRole = req.body.role;
    const user = new User({name: userName, age: userAge, gender: userGender, orders: userOrders, role: userRole});
        
    try {
        const result = await user.save();
        res.send(result);
    } catch (error) {
        res.status(422).json({message: error.message});
    }
}
let userGetFunction = async function(req, res){
    
    try {
        const result = await User.find({});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'Users not found!'});
    }
}
let userGetById = async function(req, res){     
    const id = req.params.id;
    try {
        const result = await User.findOne({_id: id});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'User not found!'});
    };
}
let userDeleteById = async function(req, res){     
    const id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'User not found!'});
    };
};
let updateUser = async function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const newUser = {age: userAge, name: userName, gender: userGender, orders: userOrders};
    try {
        const result = await User.findOneAndUpdate({_id: id}, newUser, {new: true});
        res.send(result);
    } catch (error) {
        res.status(404).json({message: 'User not found!'});
    };
};
module.exports.userPostFunction = userPostFunction;
module.exports.userGetFunction = userGetFunction;
module.exports.userGetById = userGetById;
module.exports.userDeleteById = userDeleteById;
module.exports.updateUser = updateUser;


