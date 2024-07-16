const ProductModel = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      brand,
      markedPrice,
      sellingPrice,
      description,
      gender,
      type,
    } = req.body;

    if (
      !productId ||
      !name ||
      !brand ||
      !markedPrice ||
      !sellingPrice ||
      !description ||
      !gender ||
      !type
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = new ProductModel({
      productId,
      name,
      brand,
      markedPrice,
      sellingPrice,
      description,
      gender,
      type,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add stock to an existing product
const addStockToProduct = async (req, res) => {
  try {
    const { productId, color, size, stock } = req.body;

    if (!productId || !color || !size || stock == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await ProductModel.findOne({ productId });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const stockIndex = product.stocks.findIndex(
      (s) => s.color === color && s.size === size
    );
    if (stockIndex > -1) {
      product.stocks[stockIndex].stock += stock;
    } else {
      product.stocks.push({ color, size, stock });
    }

    await product.save();
    res.status(200).json({ message: "Stock added successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findOne({ productId });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findOneAndDelete({ productId });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  addStockToProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
