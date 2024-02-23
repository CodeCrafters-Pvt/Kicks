const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const PastAdminSchema=new Schema({
    NIC:{
        type:String,
        required:true,
        unique: true,
    },
    phoneNumber:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
    }
},{timestamps:false})



module.exports=mongoose.model('PastAdmin',PastAdminSchema)




