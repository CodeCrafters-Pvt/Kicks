const ProductModel = require('../models/product')
const removedProductModel = require('../models/removedProduct')

//get all product details
const getAllProducts = async (req,res)=>{
    // try{
        const products=await ProductModel.find();
        res.status(200).json(products)
    // }
    // catch(error){
    //     res.status(400).json({error:error.message})
    // }
}


const createProduct = async (req, res) => {
  const productDetails = req.body;
  try {
    const product = await ProductModel.create(productDetails);
    res.status(201).json({product,message:"product created successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create product
// const createProduct = async (req, res) => {
//     const productDetails=req.body;
//     // try{
//         const product= await ProductModel.create(productDetails);
//         res.status(201).json(product)
//     // }
//     // catch(error){
//     //     res.status(400).json({error:error.message})
//     // }
//   };
  


// update product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productDetails = req.body;
  
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        productDetails,
        { new: true }
      );
  
      if (!updatedProduct)
        return res.status(404).json({ error: 'Product not found' });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };




//remove product
const removeProduct= async (req,res)=>{
    const {id} = req.body;
    try{
        const removedProduct = await ProductModel.findByIdAndDelete(id);
        if (!removedProduct)   return res.status(404).json({ error: 'Product not found' });
        const { _id, ...pastProductData } = removedUser.toObject();
        console.log(pastProductData)
        await removedProductModel.create(pastProductData);
        res.status(200).json({ message: 'product removed successfully' });
    }
    catch(error){
        res.status(201).json({error:error})
    }
}

module.exports={getAllProducts,createProduct,updateProduct,removeProduct}