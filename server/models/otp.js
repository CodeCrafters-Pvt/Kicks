const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const otpSchema=new Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        index:{expires:600}
    }
   
},{timestamps:true})

module.exports=mongoose.model('Otp',otpSchema)




