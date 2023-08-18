const express = require('express');
const router=express.Router();
const { getAllProductsInCart } = require('../controllers/cartController');

router.get("/get-all-cart-products", getAllProductsInCart);

module.exports = router;