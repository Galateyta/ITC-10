const Users = require('../modeles/users.modele')

module.exports.getAllUsers = async function (req, res) {
  try {
    const result = await Users.find({});
    res.json(result)
  } catch (error) {
    res.status(400).json(error);

  }
}
module.exports.getUserByID = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Users.findOne({
      _id: id
    });
    res.json(result)

  } catch (error) {
    res.status(400).json(error);

  }
}

module.exports.addUser = async function (req, res) {
  const data = req.body;
  const users = new Users(data);
  try {
    const result = await users.save()
    res.json(result);

  } catch (error) {
    res.status(400).json(error);
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
    res.json(result)
  } catch (error) {
    res.status(400).json(error);

  }
}
module.exports.removeUser = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Users.findOneAndRemove({
      _id: id
    });
    res.json(result)

  } catch (error) {
    res.status(400).json(error);

  }
}