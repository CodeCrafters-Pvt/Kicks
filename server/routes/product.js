const express = require('express');
const router=express.Router();
const {createProduct,getAllProducts,updateProduct,removeProduct} = require('../controllers/productController');
const multer = require('multer')
const path = require('path')

router.get("/",getAllProducts);
router.post("/",createProduct);
router.put('/:id', updateProduct); // Add this line to handle the update request
router.delete("/",removeProduct);


module.exports=router



