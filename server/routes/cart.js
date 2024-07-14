const express = require("express");
const {
  getAllCarts,
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  addProductsToCart,
  removeProductsFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/allCarts", getAllCarts);
router.get("/getUserCart/:userID", getUserCart);
router.post("/addProduct", addProductToCart);
router.delete("/removeProduct", removeProductFromCart);
router.post("/addProduct/multiple", addProductsToCart);
router.delete("/removeProduct/multiple", removeProductsFromCart);
router.delete("/clearCart", clearCart);

module.exports = router;
