const Orders = require('../modeles/orders.modele')
const Products = require('../modeles/products.modele')
const Users = require('../modeles/users.modele')


module.exports.getAllOrders = async function (req, res) {

  try {
    const result = await Orders.find({})
    return res.json(result)
  } catch (error) {
    return res.status(400).json(error);

  }


}
module.exports.getOrderByID = async function (req, res) {
  const id = req.params.id;
  try {
    const result = await Orders.findOne({
      _id: id
    })
    return res.json(result)
  } catch (error) {
    return res.status(400).json(error);

  }
}
module.exports.addOrder = async function (req, res) {
  const data = req.body;
  let price = 0;
  const id = req.headers.authorization;

  try {
    for (let id of data.products) {
      const result = await Products.findById(id);
      price += result.price;
    }
    data.price = price * data.quantity;
  } catch (error) {
    return res.status(400).json(error);

  }
  let orderID;
  const orders = new Orders(data);
  try {
    const result = await orders.save();
    orderID = result.id;
    return res.json(result)
  } catch (error) {
    return res.status(400).json(error);
  }
  try {
    await Users.updateOne({
      _id: id
    }, {
      $push: {
        "orders": orderID
      }
    })

  } catch (error) {
    return res.status(400).json(error);

  }
}




module.exports.updateOrder = async function (req, res) {
  const data = {};
  const id = req.params.id;

  data.quantity = req.body.quantity;
  let price = 0;

  if (req.body.products) {
    data.products = req.body.products;

    try {
      for (const id of data.products) {
        const result = await Products.findById(id);
        price += result.price;
      }
      data.price = price * data.quantity;

    } catch (error) {
      return res.status(400).json(error);

    }
    try {
      const result = await Orders.findOneAndUpdate({
        _id: id
      }, data, {
        new: true
      })
      return res.json(result)
    } catch (error) {
      return res.status(400).json(error);

    }
  } else if (data.quantity) {
    const result = await Orders.findById(id);
    result.price /= result.quantity;
    data.price = result.price * data.quantity;

    try {
      const result = await Orders.findOneAndUpdate({
        _id: id
      }, data, {
        new: true
      })
      return res.json(result)
    } catch (error) {
      return res.status(400).json(error);

    }

  } else {
    return res.status(400).json({
      "error": "Request error "
    });
  }




}
module.exports.removeOrder = async function (req, res) {
  const orderId = req.params.id;
  const userId = req.headers.authorization;


  try {
    const result = await Orders.findOneAndRemove({
      _id: orderId
    })
    if (!result) {
      return res.status(400).json({
        "error": "Not found order"
      });

    }
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    await Users.updateOne({
      _id: userId
    }, {
      $pull: {
        "orders": orderId
      }
    })
    return res.json({
      sucesfull: "true"
    })

  } catch (error) {
    return res.status(400).json(error);

  }
}