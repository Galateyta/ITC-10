const User =  require('../models/usersInModels.js');
module.exports.isAdminMiddleware = async  function(req, res, next) {
    const user = await User.findOne({_id: req.headers.authorization});console.log("user",user)
    if(user.role === "isAdmin") {
        next();
    } else {
        return res.status(401).json({"Error massage": "User is not admin"});
    }
}