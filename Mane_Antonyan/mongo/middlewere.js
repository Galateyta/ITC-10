const user = require("./models/user.models");

module.exports.isUserExist = async function(req, res, next) {
    const id = req.headers.authorization;
    if (id) {
        try {
            const result = await user.findById(id);
            next();
        } catch (err) {
            res.status(401).json("User not found");
        }
    } else {
        res.status(401).json("authorization failed");
    }
}

module.exports.isAdmin = async function(req, res, next) {
    const id = req.headers.authorization;
    if (id) {
        try {
            const result = await user.findById(id);
            if ("admin" === result.role) {
                next();
            } else {
                res.status(403).json("Access denied, you have no access to this function");
            }
        } catch (err) {
            res.status(403).json("User not found!");
        }
    } else {
        res.status(401).json("authorization failed");
    }
}