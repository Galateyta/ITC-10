const User = require('../models/user.models');

async function addUser(req, res) {
    const newUser = new User(req.body);
    try {
        const data = await newUser.save()
        if (!data) {
            res.status(404).json({
                message: `No record found`
            })
            return
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function findUsers(req, res) {
    if (req.query.id) {
        try {
            const user = await User.findById(req.query.id)
            if (!user) {
                res.status(404).json({
                    message: `No record found`
                })
                return
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        try {
            const user = await User.find({})
            if (!user) {
                res.status(404).json({
                    message: `No record found`
                })
                return
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

async function deleteUser(req, res) {
    try {
        const data = await User.deleteOne({
            _id: req.query.id
        })
        if (!data.n) {
            res.status(404).json({
                message: `User not found`
            });
        }
        res.status(200).json({
            message: `User by id ${req.query.id} successfully deleted`
        })

    } catch (err) {
        res.status(400).json(err);
    };

}

async function updateUser(req, res) {
    try {
        const data = await User.updateOne({
            _id: req.query.id
        }, req.body, {
            runValidators: true
        })
        if (!data.n) {
            res.status(404).json({
                message: `User not found`
            });
        }
        res.status(200).json({
            message: `User by id ${req.query.id} successfully updated`
        });

    } catch (err) {
        res.status(400).json(err);
    };
}

module.exports.addUser = addUser;
module.exports.findUsers = findUsers;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
