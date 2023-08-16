const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const removedProductSchema=new Schema({
    productID:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productCollection:{
        type:String,
        required:true,
    },
    sizes:{
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
                        required: true,
                      },
                      qty: {
                        type: String,
                        required: true,
                      },
                  },
            },
    },

    productDesc:{
        type:String,
        required:false,
    },
},{timestamps:false})

module.exports=mongoose.model('removedProduct',removedProductSchema)




