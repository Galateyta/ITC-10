const Orders = require('../modeles/orders.modele')
const Products = require('../modeles/products.modele')
module.exports.getAllOrders = async  function(req, res){

  try {
    const result = await Orders.find({})
    res.json(result)
  } catch (error) {
    res.status(400).json(error);

  }

   
}
module.exports.getOrderByID = async function(req, res){
const id = req.params.id;
try {
  const result = await Orders.findOne({_id:id})
  res.json(result)
} catch (error) {
  res.status(400).json(error);

}
}
module.exports.addOrder = async function(req, res){
  const data = req.body;
  let price = 0;
  try {
    for (const id  of data.products){
     const result = await Products.findById(id);
     price += result.price;
    }
    data.price = price * data.quantity;
  } catch (error) {
   return  res.status(400).json(error);
    
  }
  const orders = new Orders (data);
  try {
    const result = await orders.save();
    res.json(result)
  } catch (error) {
    res.status(400).json(error);

  }    

 
}

module.exports.updateOrder = async function(req,res){
  const data = req.body;
  const id = req.params.id;
try {
  const result = await Orders.findOneAndUpdate({_id:id},data,{new:true})      
  res.json(result)
} catch (error) {
  res.status(400).json(error);

}           
} 
module.exports.removeOrder = async function(req,res){
  const id  = req.params.id;

  try {
   const result = await  Orders.findOneAndRemove({_id:id})      
   res.json(result)
  } catch (error) {
    res.status(400).json(error);

  }

}
