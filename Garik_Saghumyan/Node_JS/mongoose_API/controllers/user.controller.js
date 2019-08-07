const User = require('../models/user.model');
const logger = require('../config/config.dev');
// const errorLogger = require('../config/config.qa');

let userPostFunction = async function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const userRole = req.body.role;
    const user = new User({
        name: userName,
        age: userAge,
        gender: userGender,
        orders: userOrders,
        role: userRole
    });

    try {
        const result = await user.save();
        res.send(result);
        logger.debug({
            message: "New user succesfully added",
            request: req.body,
            status: res.statusCode,
            response: result
        });
    } catch (error) {
        res.status(422).json({
            message: error.message
        });
        logger.error({
            message: error.message,
            request: req.body,
            status: res.statusCode
        });
    }
}
let userGetFunction = async function (req, res) {

    try {
        const result = await User.find({});
        res.send(result);
        logger.debug({
            message: "Get All users",
            request: req.body,
            status: res.statusCode,
            response: result
        });
    } catch (error) {
        res.status(404).json({
            message: 'Users not found!'
        });
        logger.error({
            message: "Cannot find users",
            request: req.body,
            status: res.statusCode
        });
    }
}
let userGetById = async function (req, res) {
    const id = req.params.id;
    try {
        const result = await User.findOne({
            _id: id
        });
        res.send(result);
        debugLogger.debug({
            message: "Get user by id",
            request: req.body,
            status: res.statusCode,
            response: result
        });
    } catch (error) {
        res.status(404).json({
            message: 'User not found!'
        });
        logger.error({
            message: "Cannot find user by id",
            request: req.body,
            status: res.statusCode
        });
    };
}
let userDeleteById = async function (req, res) {
    const id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);
        res.send(result);
        logger.debug({
            message: "User deleted successfully",
            request: req.body,
            status: res.statusCode,
            response: result
        });
    } catch (error) {
        res.status(404).json({
            message: 'User not found!'
        });
        logger.error({
            message: "Cannot delete user by id",
            request: req.body,
            status: res.statusCode
        })
    };
};
let updateUser = async function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = req.body._id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userGender = req.body.gender;
    const userOrders = req.body.orders;
    const newUser = {
        age: userAge,
        name: userName,
        gender: userGender,
        orders: userOrders
    };
    try {
        const result = await User.findOneAndUpdate({
            _id: id
        }, newUser, {
            new: true
        });
        res.send(result);
        logger.debug({
            message: "User updateded successfully",
            request: req.body,
            status: res.statusCode,
            response: result
        });
    } catch (error) {
        res.status(404).json({
            message: 'User not found!'
        });
        logger.error({
            message: "Can not apdate user info",
            request: req.body,
            status: res.statusCode
        })
    };
};
module.exports.userPostFunction = userPostFunction;
module.exports.userGetFunction = userGetFunction;
module.exports.userGetById = userGetById;
module.exports.userDeleteById = userDeleteById;
module.exports.updateUser = updateUser;