const user =  require('../models/user.model');
let checkUser = async function (req, res, next) {
    const auth = req.headers.authorization
    if (!auth){
        res.status(401).json({message: 'Unauthorized'});
        return;
    }else {
        try {
            const authUser = await user.findOne({_id: auth});
            next();
        } catch (error) {
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
    }
};
module.exports = checkUser;