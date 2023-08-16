const express = require('express');
const router=express.Router();
const {createProduct,getAllProducts,updateProduct,removeProduct} = require('../controllers/productController');
const multer = require('multer')
const path = require('path')

router.get("/",getAllProducts);
router.post("/",createProduct);
router.put('/:id', updateProduct); // Add this line to handle the update request
router.delete("/",removeProduct);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images'); // Specify the destination folder for storing uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
  });
  

const upload = multer({
    storage:storage
})

router.post('/upload', upload.single('file'), (req,res) =>{
    // productModel.create({image: req.file.filename})
    // .then(result => res.json(result))
    // .catch(err => console.log(err)) 
   console.log(req.file)
})


module.exports=router

