const User = require('../models/user.models');
const logger = require('../logging/logger.js');

async function addUser(req, res) {
    const newUser = new User(req.body);
    try {
        const data = await newUser.save()
        if (!data) {
            logger.log('debug', `res /users 400`);
            logger.log('debug', `res /users No record found`);

            res.status(404).json({
                message: "No record found"
            });
            return;
        }

        logger.log('debug', `res /users 200`);
        logger.log('debug', `res /users ${JSON.stringify(data)}`);

        res.status(200).json(data);
    } catch (err) {
        logger.log('err', `res /users ${JSON.stringify(err)}`);
        res.status(400).json(err);
    }
}

async function getUsers(req, res) {
    if (req.query.id) {
        try {
            const user = await User.findById(req.query.id);
            if (!user) {
                logger.log('debug', `res /users 400`);
                logger.log('debug', `res /users User by id ${req.query.id} not found`);

                res.status(404).json({
                    message: `User by id ${req.query.id} not found`
                });
                return;
            }

            logger.log('debug', `res /users 200`);
            logger.log('debug', `res /users ${JSON.stringify(user)}`);    

            res.status(200).json(user);
        } catch (err) {
            res.status(404).json(err);
        }
    } else {
        try {
            const user = await User.find({});
            if (!user) {
                logger.log('debug', `res /users 400`);
                logger.log('debug', `res /users No record found`);

                res.status(404).json({
                    message: "No record found"
                });
                return;
            }

            logger.log('debug', `res /users 200`);
            logger.log('debug', `res /users ${JSON.stringify(user)}`);
    
            res.status(200).json(user);
        } catch (err) {
            logger.log('err', `res /users ${JSON.stringify(err)}`);
            res.status(400).json(err);
        }
    }
}

async function deleteUser(req, res) {
    try {
        await User.deleteOne({
            _id: req.query.id
        });

        logger.log('debug', `res /users 200`);
        logger.log('debug', `res /users User by id ${req.query.id} successfully deleted`);

        res.status(200).json({
            message: `User by id ${req.query.id} successfully deleted`
        });
    } catch (err) {
        logger.log('err', `res /users ${JSON.stringify(err)}`);
        res.status(404).json({
            message: `User by id ${req.query.id} not found`
        });
    }
}

async function updateUser(req, res) {
    try {
        await User.updateOne({
            _id: req.query.id
        }, req.body, {
            runValidators: true
        });

        logger.log('debug', `res /users 200`);
        logger.log('debug', `res /users User by id ${req.query.id} successfully updated`);

        res.status(200).json({
            message: `User by id ${req.query.id} successfully updated`
        });
    } catch (err) {
        logger.log('err', `res /users ${JSON.stringify(err)}`);
        res.status(404).json({
            message: `User by id ${req.query.id} not found`
        });
    }
}

module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;