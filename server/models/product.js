const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ProductSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    markedPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["kids", "female", "male", "uni"],
      required: true,
    },
    type: {
      type: String,
      enum: [
        "sneakers",
        "loafers",
        "boots",
        "sandals",
        "heels",
        "flats",
        "other",
      ],
      required: true,
    },
    stocks: [StockSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
