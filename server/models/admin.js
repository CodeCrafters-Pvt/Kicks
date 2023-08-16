const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const AdminSchema=new Schema({
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    phoneNumber:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:false,
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
      }
},{timestamps:false})

module.exports=mongoose.model('Admin',AdminSchema)




