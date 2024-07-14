const CartModel = require("../models/cart");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");

// Get all cart details (for debugging/admin purposes)
const getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.find()
      .populate("userID")
      .populate("products.productID");
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get cart details for a specific user
const getUserCart = async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) return res.status(404).json({ error: "Missing user ID" });

    const cart = await CartModel.findOne({ userID }).populate(
      "products.productID"
    );
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    let cartTotal = 0;
    cart.products.forEach((product) => {
      cartTotal += product.productID.sellingPrice * product.qty;
    });

    res
      .status(200)
      .json({ cart, cartTotal, message: "Cart retrieved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a product to the cart
const addProductToCart = async (req, res) => {
  try {
    const { userID, productID, qty } = req.body;
    if (!userID || !productID || !qty)
      return res.status(400).json({ error: "Missing credentials" });

    const product = await ProductModel.findById(productID);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const cart = await CartModel.findOne({ userID });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productID.toString() === productID
      );
      if (productIndex > -1) {
        cart.products[productIndex].qty += qty;
      } else {
        cart.products.push({ productID, qty });
      }
      await cart.save();
    } else {
      await CartModel.create({ userID, products: [{ productID, qty }] });
    }

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a product from the cart
const removeProductFromCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    if (!userID || !productID)
      return res.status(400).json({ error: "Missing credentials" });

    const cart = await CartModel.findOne({ userID });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productID.toString() === productID
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
    }

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add multiple products to the cart
const addProductsToCart = async (req, res) => {
  try {
    const { userID, products } = req.body;
    if (!userID || !products || products.length === 0)
      return res.status(400).json({ error: "Missing credentials or products" });

    const existingCart = await CartModel.findOne({ userID });
    if (existingCart) {
      products.forEach(({ productID, qty }) => {
        const productIndex = existingCart.products.findIndex(
          (p) => p.productID.toString() === productID
        );
        if (productIndex > -1) {
          existingCart.products[productIndex].qty += qty;
        } else {
          existingCart.products.push({ productID, qty });
        }
      });
      await existingCart.save();
    } else {
      const cartData = {
        userID,
        products: products.map(({ productID, qty }) => ({ productID, qty })),
      };
      await CartModel.create(cartData);
    }

    res.status(200).json({ message: "Products added to cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove multiple products from the cart
const removeProductsFromCart = async (req, res) => {
  try {
    const { userID, productIDs } = req.body;
    if (!userID || !productIDs || productIDs.length === 0)
      return res
        .status(400)
        .json({ error: "Missing credentials or product IDs" });

    const cart = await CartModel.findOne({ userID });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    productIDs.forEach((productID) => {
      const productIndex = cart.products.findIndex(
        (p) => p.productID.toString() === productID
      );
      if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
      }
    });
    await cart.save();

    res
      .status(200)
      .json({ message: "Products removed from cart successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Clear the cart for a user
const clearCart = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) return res.status(400).json({ error: "Missing user ID" });

    const cart = await CartModel.findOne({ userID });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCarts,
  getUserCart,
  addProductToCart,
  removeProductFromCart,
  addProductsToCart,
  removeProductsFromCart,
  clearCart,
};
