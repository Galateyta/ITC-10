const User =  require('../models/usersInModels.js');
module.exports.isUserMiddleware = async  function(req, res, next) {
    if(req.headers.authorization) {
        try {
            const user = await User.findOne({_id: req.headers.authorization});console.log("user",user)
            next();
        } catch (error) {
            return res.status(401).json({"Error massage": "Id in authorization is  invalid"});
        }
    } else {
        res.status(401).json({"Error massage": "Authorization is empty"});
    }
}
