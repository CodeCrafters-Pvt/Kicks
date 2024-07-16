const express = require("express");
const {
  createProduct,
  addStockToProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/createProduct", createProduct);
router.post("/addStock", addStockToProduct);
router.get("/allProducts", getAllProducts);
router.get("/getProduct/:productId", getProductById);
router.delete("/deleteProduct/:productId", deleteProduct);

module.exports = router;
