const express = require("express");
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const router = express.Router();

router.post("/createBrand", createBrand);
router.get("/allBrands", getAllBrands);
router.get("/getBrand/:brandId", getBrandById);
router.put("/updateBrand/:brandId", updateBrand);
router.delete("/deleteBrand/:brandId", deleteBrand);

module.exports = router;
