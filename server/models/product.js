const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productID: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productCollection: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: String,
      required: true,
    },
    sizes: {
      size: {
        type: String,
        required: true,
      },
      colors: {
        color: {
          type: String,
          required: true,
        },
        stocks: {
          stockID: {
            type: String,
            required: false,
          },
          qty: {
            type: String,
            required: false,
          },
        },
      },
    },
    productDesc: {
      type: String,
      required: false,
    },
    // image: {
    //   data: Buffer, 
    //   contentType: String, 
      
    // },
    image: {
      type: String, 
     required:true, 
  },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Product', ProductSchema);
