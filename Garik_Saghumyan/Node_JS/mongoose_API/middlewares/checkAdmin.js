const user =  require('../models/user.model');
let checkAdmin = async function (req, res, next) {
    const auth = req.headers.authorization
    if (!auth){
        res.status(401).json({message: 'Unauthorized'});
        return;
    }else {
        try {
            const authUser = await user.findOne({_id: auth});
            if(authUser.role !== 'admin'){
                res.status(403).json({message: 'Forbidden'});
                return;
            }
            next();
        } catch (error) {
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
    }
};
module.exports = checkAdmin;