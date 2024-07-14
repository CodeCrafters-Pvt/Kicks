const UserModel = require('../models/user')
const PastUserModel = require('../models/pastUser')
const OtpModel= require('../models/otp')
const bcrypt = require('bcryptjs')
const sendEmail = require('../middlewears/email')
const otpGenerator = require('otp-generator')
const {createToken} =require('./authController')




//get all user details
const getAllUsers = async (req,res)=>{
    try{
        const users=await UserModel.find();
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getUser= async (req,res)=>{
    try{
        const { email }=req.params
        if(! email) return res.status(404).json({error:"Missing credentials"})
        const user=await UserModel.findOne({
            email:email,
        })
        if(!user) return res.status(404).json({error:"User not found"})

        const { userAccount, _id , isPremium , isActive } = user;
        const {  username,profilepic } = userAccount;
        const userDetails = {
            _id,
            email,
            username,
            profilepic,
            isPremium,
            isActive
          };          

        res.status(200).json({userDetails,message:"User Account Retrieved successfully"})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//send OTP
const sendOtp = async (req,res)=>{
    const {email,userName} =req.body;
    try{
        if(!email || !userName) return res.status(400).json({error:"Missing Credentials"})
        //check if credentials are already taken
        const existingUserName=await UserModel.findOne({"userAccount.username":userName});
        const existingUserEmail=await UserModel.findOne({email:email});
        if(existingUserName && existingUserEmail)  return res.status(409).json({error:"Username and E-mail already exists"});
        if(existingUserName)  return res.status(409).json({error:"Username already exists"});
        if(existingUserEmail)  return res.status(409).json({error:"E-mail already exists"});

        //store and send Otp through e-mail
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const EmailContent = `<h3>Your OTP for verification</h3>
                              <h1> ${OTP} </h1>`;
        sendEmail(email,EmailContent,"OTP Verification");
        const hashedOTP= await bcrypt.hash(OTP,10);
        const savedOTP= await OtpModel.create({
            otp:hashedOTP,
            email:email,
        })
        res.status(200).json({message:"OTP sent successfully"})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


//create user
const createUser = async (req,res)=>{
    const {otp,...userDetails}= req.body
    try{
        //verify otp
        const otpHolder= await OtpModel.find({email:userDetails.email})
        if(otpHolder.length === 0) return res.status(400).json({error:"Expired OTP"})
        const lastOtp = otpHolder [otpHolder.length-1];
        const validOtp =await  bcrypt.compare(otp,lastOtp.otp);


        if(lastOtp.email === userDetails.email && validOtp){
            //create user
            const hashedPassword = await bcrypt.hash(userDetails.userAccount.password, 10);
            const user= await UserModel.create({...userDetails,userAccount:{...userDetails.userAccount,password:hashedPassword}})
            const otpDelete= await OtpModel.deleteMany({
                email : lastOtp.email
            })
            const token=createToken(user._id,'3d')
            return res.status(201).json({token,message:"Registration Successful"})
        }    
        return res.status(400).json({error:"Invalid OTP"})    
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//remove user
const removeUser= async (req,res)=>{
    const {id} = req.body;
    try{
        const removedUser = await UserModel.findByIdAndDelete(id);
        if (!removedUser)   return res.status(404).json({ error: 'User not found' });
        const { _id, ...pastUserData } = removedUser.toObject();
        await PastUserModel.create(pastUserData);
        res.status(200).json({ message: 'User removed successfully' });
    }
    catch(error){
        res.status(201).json({error:error})
    }
}


const deactivateUser = async (req,res)=>{
    const {id} =req.body;
    try{
        const user = await UserModel.findById(id);
        if (!user)   return res.status(404).json({ error: 'User not found' });
        if (user.isActive) {
            // Deactivate the account
            user.isActive = false;
            user.deactivationDate = new Date();
            await user.save();
            res.status(200).json({ message: 'User account deactivated successfully' });
          } else {
            res.status(200).json({ message: 'User account is already deactivated' });
          }

    }
    catch(error){
        res.status(400).json({error:error})
    }
}

const reactivateUser = async (req, res) => {
    const { id } = req.body;
    try {
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      if (user.isActive) return res.status(400).json({ message: 'User account is already active' });
      else {
        // Check if the deactivation date is within 14 days
        const deactivationDate = user.deactivationDate;
        const currentDate = new Date();
        const daysDifference = Math.ceil((currentDate - deactivationDate) / (1000 * 60 * 60 * 24));
  
        if (daysDifference <= 14) {
          // Reactivate the account
          user.isActive = true;
          user.deactivationDate = undefined;
          await user.save();
          res.status(200).json({ message: 'User account reactivated successfully' });
        } else {
          res.status(400).json({ message: 'User account deleted permanently and cannot be reactivated' });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  





module.exports={createUser,getAllUsers,getUser,deactivateUser,reactivateUser,removeUser,sendOtp}