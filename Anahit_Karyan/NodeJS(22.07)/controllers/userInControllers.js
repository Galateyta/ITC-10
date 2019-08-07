const User = require('../models/usersInModels');
const logger = require('../logger/logg');

module.exports.getAllUsers = async function(req, res){      
    try {
        const users = await User.find({});

        // logger.info({'requestInfo': req.body});
        // logger.info({'responseCode': res.statusCode});
        // logger.info({'responseBody': res.body});

        res.status(200).json(users);
    } catch (error) {

        // logger.error({'requestInfo': req.body});
        // logger.error({'responsCode': 400},error);

        return res.status(400).json(error);
    }
}

module.exports.postUser = async function (req, res) {
    if(!req.body) return res.sendStatus(400);  
    try {
        const user = new User({name: req.body.name, age: req.body.age, gender: req.body.gender, orders: req.body.orders, role: req.body.role});
        user.save();

        // logger.info({'requestInfo': req.body});
        // logger.info({'responseCode': res.statusCode});
        // logger.info({'responseBody': res.body});

        res.status(200).json(user);
    } catch (error) {

        // logger.error({'requestInfo': req.body});
        // logger.error({'responsCode': 400}, error);

        return res.status(400).json(error);
    }
}

module.exports.getUserById = async function(req, res){      
    const id = req.params.id;
    try {
        const user =  await User.findOne({_id: id});

        // logger.info({'requestInfo': req.body});
        // logger.info({'responseCode': res.statusCode});
        // logger.info({'responseBody': res.body});

        res.status(200).json(user);
    } catch (error) {


        // logger.error({'requestInfo': req.body});
        // logger.error({'responsCode': 400}, error);

        return res.status(400).json(error);
    }
}

module.exports.putUserById = async function(req, res){   
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate({_id: id}, req.body, {new: true});
        
        // logger.info({'requestInfo': req.body});
        // logger.info({'responseCode': res.statusCode});
        // logger.info({'responseBody': res.body});

        res.status(200).json(user);
    } catch (error) {


        // logger.error({'requestInfo': req.body});
        // logger.error({'responsCode': 400}, error);

        return res.status(400).json(error);
    }
}

module.exports.deleteUserById = async function(req, res){
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);

        // logger.info({'requestInfo': req.body});
        // logger.info({'responseCode': res.statusCode});
        // logger.info({'responseBody': res.body});

        res.status(200).json(user);
    } catch (error) {


        // logger.error({'requestInfo': req.body});
        // logger.error({'responsCode': 400}, error);

        return res.status(400).json(error);
    }
}