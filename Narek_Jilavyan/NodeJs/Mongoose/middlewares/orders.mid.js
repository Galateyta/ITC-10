const User = require('../models/users.mod');

async function checkUser(req, res, next){
    try{
        const user = await User.findById(req.headers.authorezation);
        if(user){
            next();
        }
        else{
            res.status(401).json({"error": "unauthorezed"});
        }
    }
    catch{
        res.status(401).json({"error": "unauthorezed"});

    }
}


module.exports.checkUser = checkUser;