const User = require('../models/user.models');

function findAllUsers() {
    return User.find({}).exec();
}

function findUsersById(id) {
    return User.findById(id).exec();
}

function addOneUser(user) {
    const newUser = new User(user);
    return newUser.save();
}

function updateOneUser(id, info) {
    return User.updateOne({ _id: id }, info,
        {runValidators: true}).exec();
}

function deleteOneUser(id) {
    return User.deleteOne({ _id: id }).exec();
}

module.exports.findAllUsers = findAllUsers;
module.exports.findUsersById = findUsersById;
module.exports.addOneUser = addOneUser;
module.exports.updateOneUser = updateOneUser;
module.exports.deleteOneUser = deleteOneUser;