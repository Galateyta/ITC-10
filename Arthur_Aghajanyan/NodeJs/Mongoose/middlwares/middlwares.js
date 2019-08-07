const user = require('../models/user.models.js')

module.exports.checkUser = async function(req, res, next) {
    const id = req.headers.authorization;
    if (id) {
        try {
            const result = await user.findById(id);
            next();
        } catch (err) {
            res.status(401).json(`Not found user by id`);
        }
    } else {
        res.status(401).json(`authorization failed`)
    }
}

module.exports.checkAdmin = async function(req, res, next) {

    const id = req.headers.authorization;
    if (id) {
        try {
            const result = await user.findById(id);
            if(result.role === "admin"){
                next();
            } else {
                res.status(403).json(`Access denied, you have no access to this function`);
            }
        } catch (err) {
            res.status(403).json(`Not found user by id`);
        }
    } else {
        res.status(401).json(`authorization failed`)
    }
}
