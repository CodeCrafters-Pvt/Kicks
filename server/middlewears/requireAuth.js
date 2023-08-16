const jwt=require('jsonwebtoken')
const userModel = require("../models/user")
const adminModel=require("../models/admin")

const requireAuth= async (req,res,next)=>{
    //verify authentication
    const { authorization }= req.headers

    if(!authorization) return res.status(401).json({error:'Authorization token required'})

    const token=authorization.split(' ')[1];
    try{
      const {_id} = jwt.verify(token,process.env.JWT_SECRET)
      let user = await adminModel.findOne({ _id }).select('_id');
      if (!user) {
        user = await userModel.findOne({ _id }).select('_id');
      }
      if (!user) {
        return res.status(401).json({ error: 'Request is not authorized' });
      }
      req.user=user;
      next()
    }
    catch(error){
        console.log("Error:", error);
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports=requireAuth