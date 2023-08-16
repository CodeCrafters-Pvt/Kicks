const userModel = require("../models/user")
const adminModel=require("../models/admin")
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken=(_id)=>{
  return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:'3d'})
}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password) return res.status(400).json({error:"Missing Credentials"})

        const user=await userModel.findOne({email});
        const admin = await adminModel.findOne({email});

        if(!user && !admin) return res.status(404).json({error:"User not found"})

        var account;

        if(user)  account=user
        if(admin) account=admin
        
        const match=await bcrypt.compare(password,account.userAccount.password)
        if(!match) return res.status(400).json({error:"Incorrect Password"})

        const token=createToken(account._id);

        const { userAccount, _id , isPremium , isActive } = account;
        const {  username,profilepic } = userAccount;
        const userDetails = {
            _id,
            email,
            username,
            profilepic,
            isPremium,
            isActive
          }; 
        res.status(200).json({userDetails,email,token,message:"Login Successful"})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


module.exports={login,createToken}