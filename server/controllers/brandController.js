const BrandModel = require("../models/brand");

const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    const newBrand = new BrandModel({ name });
    await newBrand.save();

    res
      .status(201)
      .json({ message: "Brand created successfully", brand: newBrand });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBrandById = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await BrandModel.findById(brandId);
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    const updatedBrand = await BrandModel.findByIdAndUpdate(
      brandId,
      { name },
      { new: true }
    );

    if (!updatedBrand)
      return res.status(404).json({ error: "Brand not found" });
    res
      .status(200)
      .json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const deletedBrand = await BrandModel.findByIdAndDelete(brandId);
    if (!deletedBrand)
      return res.status(404).json({ error: "Brand not found" });
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
