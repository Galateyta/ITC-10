const Products = require('../modeles/products.modele')


module.exports.getAllProducts = async function (req, res) {
    try {
        const result = await Products.find({})
        return res.json(result)

    } catch (error) {
        return res.status(400).json(error);

    }
}

module.exports.getProductByID = async function (req, res) {
    const id = req.params.id;

    try {
        const result = await Products.findOne({
            _id: id
        })
        return res.json(result)

    } catch (error) {
        return res.status(400).json(error);

    }


};

module.exports.addProduct = async function (req, res) {
    const data = req.body;
    const products = new Products(data);
    try {
        const result = await products.save();
        return res.json(result)
    } catch (error) {
        return res.status(400).json(error);

    }


}

module.exports.updateProduct = async function (req, res) {
    const data = req.body;
    const id = req.params.id;
    try {
        const result = await Products.findOneAndUpdate({
            _id: id
        }, data, {
            new: true
        })
        return res.json(result)

    } catch (error) {
        return res.status(400).json(error);

    }


}
module.exports.removeProduct = async function (req, res) {
    const id = req.params.id;
    try {
        const result = await Products.findOneAndRemove({
            _id: id
        })
        return res.json(result)

    } catch (error) {
        return res.status(400).json(error);


    }
}