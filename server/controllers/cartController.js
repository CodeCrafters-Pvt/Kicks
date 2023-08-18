const ProductModel = require('../models/product');

//get all product in cart
const getAllProductsInCart = async (req,res)=>{
    const cartProductIds = [
        "64b55219aa6f559f6ded4172", 
        "64b55228aa6f559f6ded4174",
        "64b5529bc1c79b789d13430b"
    ];

    try{
        const cartProducts = await ProductModel.find({ _id: { $in: cartProductIds } });
        res.status(200).json(cartProducts);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports={getAllProductsInCart}