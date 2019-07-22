const User = require('../models/user.model');
let userPostFunction =  function(req, res){
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const user = new User({name: userName, age: userAge, gender: userGender, orders: userOrders});
    let error = user.validateSync();
        
    user.save().then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.send(error.message);
    });
}
let userGetFunction = function(req, res){
    User.find({}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.status(404).send('Users not found!');
    });
}
let userGetById = function(req, res){     
    const id = req.params.id;
    User.findOne({_id: id}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.status(404).send('User not found!');
    });
}
let userDeleteById =  function(req, res){     
    const id = req.params.id;
    User.findByIdAndDelete(id).then((result) => {
        res.send(result)
    }).catch((reject) => {
        res.status(404).send('User not found!');
    });
};
let updateUser = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const newUser = {age: userAge, name: userName, gender: userGender, orders: userOrders};
    User.findOneAndUpdate({_id: id}, newUser, {new: true}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        res.status(404).send('User not found!');
    });
};
module.exports.userPostFunction = userPostFunction;
module.exports.userGetFunction = userGetFunction;
module.exports.userGetById = userGetById;
module.exports.userDeleteById = userDeleteById;
module.exports.updateUser = updateUser;


