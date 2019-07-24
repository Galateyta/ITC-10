const Users = require('../modeles/users.modele')
const logger = require('../loger/winston.logger')
module.exports.getAllUsers = async function (req, res) {
  try {
    const result = await Users.find({});
    res.status = 200;
    logger.info(req.info);
    logger.info(res.body);
    logger.info(res.status);
    return res.json(result)
  } catch (error) {
    return res.status(400).json(error);

  }
}
module.exports.getUserByID = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Users.findOne({
      _id: id
    });
    return res.json(result)

  } catch (error) {
    return res.status(400).json(error);

  }
}

module.exports.addUser = async function (req, res) {
  const data = req.body;
  const users = new Users(data);
  try {
    const result = await users.save()
    return res.json(result);

  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports.updateUser = async function (req, res) {
  const data = req.body;
  const id = req.params.id;
  try {
    const result = await Users.findOneAndUpdate({
      _id: id
    }, data, {
      new: true
    });
    return res.json(result)
  } catch (error) {
    return res.status(400).json(error);

  }
}
module.exports.removeUser = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Users.findOneAndRemove({
      _id: id
    });
    return res.json(result)

  } catch (error) {
    return res.status(400).json(error);

  }
}