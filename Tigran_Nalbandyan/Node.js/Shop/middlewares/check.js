const User = require('../models/user.models.js');

async function checkUser(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        try {
            await User.findById(token);
            next();
        } catch {
            res.status(401).json({
                message: 'Authorization failed'
            });
        }
    } else {
        res.status(401).json({
            message: 'Authorization failed'
        });
    }
}

async function checkAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        try {
            const user = await User.findById(token);
            if (user.role === 'admin') {
                next()
            } else {
                throw Error;
            }
        } catch {
            res.status(403).json({
                message: 'Access denied'
            });
        }
    } else {
        res.status(403).json({
            message: 'Access denied'
        });
    }
}

module.exports.checkUser = checkUser;
module.exports.checkAdmin = checkAdmin;