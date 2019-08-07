const Users = require('../modeles/users.modele')
const user = require('../controlers/users.controlers')
module.exports.checkUser = async function (req, res, next) {
    if (req.headers.authorization) {
        const id = req.headers.authorization;
        try {
            await Users.findOne({
                _id: id
            });
            next();

        } catch (error) {
            return res.status(401).json(error);
        }
    } else {
        return res.status(401).json({
            error: "Authorisation error"
        });

    }
}
module.exports.checkAdmin = async function (req, res, next) {
    if (req.headers.authorization) {
        const id = req.headers.authorization;
        try {
            const result = await Users.findOne({
                _id: id
            });
            if (result.role) {
                next();

            } else {
                return res.status(403).json({
                    error: "Not Admin"
                });
            }

        } catch (error) {
            return res.status(403).json(error);
        }
    } else {
        return res.status(401).json({
            error: "Authorisation error"
        });

    }
}
module.exports.addAdmin = async function (req, res, next) {
    if (req.headers.authorization) {
        const admin = req.headers.authorization;
        try {

            if ("admin" === admin && (req.body.role && ("admin" === req.body.role))) {
                next();
            } else {
                return res.status(401).json({
                    error: "You dont have create Admin user "
                });
            }

        } catch (error) {
            return res.status(401).json(error);
        }
    } else if (req.body.role && ("admin" === req.body.role)) {
        return res.status(401).json({
            error: "You dont have create Admin user "
        });

    } else {
        next();
    }
}