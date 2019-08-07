const User = require('../models/users.mod');

async function checkAdmin(req, res, next){
    try{
        const user = await User.findById(req.headers.authorezation);
        if(user.role === "admin"){
            next();
        }
        else{
            res.status(403).json({"error": "You are not admin"});
        }
    }
    catch{
        res.status(401).json({"error": "unauthorezed"});

    }
}

module.exports.checkAdmin = checkAdmin;