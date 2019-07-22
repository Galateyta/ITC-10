const User = require('../models/user.models');

function addUser(user) {
    const newUser = new User(user);
    return newUser.save();
}

function findUsers() {
    return User.find({}).exec();
}

function findUsersById(id) {
    return User.findById(id).exec();
}

function deleteUser(id) {
    return User.deleteOne({
        _id: id
    }).exec();
}

function updateUser(id, info) {
    return User.updateOne({
        _id: id
    }, info, {runValidators: true}).exec();
}

module.exports.addUser = addUser;
module.exports.findUsers = findUsers;
module.exports.findUsersById = findUsersById;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;