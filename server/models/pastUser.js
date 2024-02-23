const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const PastUserSchema=new Schema({
    phoneNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
},{timestamps:false})

module.exports=mongoose.model('Past User',PastUserSchema)




