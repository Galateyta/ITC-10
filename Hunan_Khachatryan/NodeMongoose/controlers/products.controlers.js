const Products = require('../modeles/products.modele')


  module.exports.getAllProducts = async function(req,res){
      try {
          const result =  await Products.find({})
          res.json(result)

      } catch (error) {
        res.status(400).json(error);

      }    
}

module.exports.getProductByID = async function(req,res){
    const id = req.params.id;
     
    try {
        const result = await Products.findOne({_id:id})
        res.json(result)

    } catch (error) {
        res.status(400).json(error);

    }
     
   
};

module.exports.addProduct = async function  (req, res){
    const data = req.body;
    const products = new Products (data);
    try {
        const result = await products.save();  
        res.json(result)
    } catch (error) {
        res.status(400).json(error);

    }


}

module.exports.updateProduct = async function(req, res){
    const data = req.body;
    const id = req.params.id;
    try {
        const result = await Products.findOneAndUpdate({_id:id},data,{new:true})      
        res.json(result)

    } catch (error) {
        res.status(400).json(error);

    }
            
        
}
module.exports.removeProduct = async function(req, res){
    const id = req.params.id;
    try {
        const result = await Products.findOneAndRemove({_id:id})      
        res.json(result)

    } catch (error) {
        res.status(400).json(error);

    
    }
}