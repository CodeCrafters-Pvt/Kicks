const ProductModel = require("../models/product");
const BrandModel = require("../models/brand");

const fetchEnums = async (req, res) => {
  try {
    const genderEnum = ProductModel.getGenderEnumValues();
    const typeEnum = ProductModel.getTypeEnumValues();
    const brands = await BrandModel.find({}, "name");

    const brandEnum = brands.map((brand) => ({
      id: brand._id,
      name: brand.name,
    }));

    res.status(200).json({ genderEnum, typeEnum, brandEnum });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enum values" });
  }
};

const generateProductId = async (req, res) => {
  try {
    const lastProduct = await ProductModel.findOne()
      .sort({ productId: -1 })
      .select("productId");

    let newProductId = "000001";
    if (lastProduct && lastProduct.productId) {
      const lastIdNum = parseInt(lastProduct.productId, 10);
      if (!isNaN(lastIdNum)) {
        newProductId = String(lastIdNum + 1).padStart(6, "0");
      }
    }

    res.status(200).json(newProductId);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate ID" });
  }
};

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
      !gender ||
      !type
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingProduct = await ProductModel.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json({ error: "Product ID must be unique" });
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
  fetchEnums,
  generateProductId,
  createProduct,
  addStockToProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
