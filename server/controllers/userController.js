const UserModel = require('../models/user')
const PastUserModel = require('../models/pastUser');

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

//create user
const createUser = async (req,res)=>{
    const userDetails=req.body;
    try{
        const existingUserName=await UserModel.findOne({"userAccount.username":userDetails.userAccount.username});
        const existingUserEmail=await UserModel.findOne({email:userDetails.email});
        if(existingUserName && existingUserEmail)  return res.status(409).json({error:"Username and E-mail already exists"});
        if(existingUserName)  return res.status(409).json({error:"Username already exists"});
        if(existingUserEmail)  return res.status(409).json({error:"E-mail already exists"});
        const user= await UserModel.create(userDetails);
        res.status(201).json(user)
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
        console.log(pastUserData)
        await PastUserModel.create(pastUserData);
        res.status(200).json({ message: 'User removed successfully' });
    }
    catch(error){
        res.status(201).json({error:error})
    }
}




module.exports={createUser,getAllUsers,removeUser}