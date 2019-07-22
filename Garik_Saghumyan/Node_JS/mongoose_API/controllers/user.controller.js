const User = require('../models/user.model');
let userPostFunction =  function(req, res){
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const user = new User({name: userName, age: userAge, gender: userGender, orders: userOrders});
    console.log(user);
        
    user.save().then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
}
let userGetFunction = function(req, res){
    User.find({}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
}
let userGetById = function(req, res){     
    const id = req.params.id;
    User.findOne({_id: id}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
}
let userDeleteById =  function(req, res){     
    const id = req.params.id;
    User.findByIdAndDelete(id).then((result) => {
        res.send(result)
    }).catch((reject) => {
        console.log(reject);
    });
};
let updateUser = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};
    User.findOneAndUpdate({_id: id}, newUser, {new: true}).then((result) => {
        res.send(result);
    }).catch((reject) => {
        console.log(reject);
    });
};
module.exports.userPostFunction = userPostFunction;
module.exports.userGetFunction = userGetFunction;
module.exports.userGetById = userGetById;
module.exports.userDeleteById = userDeleteById;
module.exports.updateUser = updateUser;


