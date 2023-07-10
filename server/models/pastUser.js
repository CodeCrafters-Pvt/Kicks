const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const PastUserSchema=new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    userAccount: {
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        profilepic: {
          type: String,
          required: false,
        },
      },
},{timestamps:false})

module.exports=mongoose.model('Past User',PastUserSchema)




