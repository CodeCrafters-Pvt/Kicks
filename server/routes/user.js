const express = require('express');
const requireAuth=require('../middlewears/requireAuth')
const { createUser,getAllUsers,getUser,deactivateUser,reactivateUser,removeUser,sendOtp } = require('../controllers/userController');

const router=express.Router();
// router.use(requireAuth)


router.get("/allUsers",getAllUsers);
router.get("/getUser/:email",getUser);
router.post("/signup/verify",sendOtp);
router.post("/signup",createUser);
router.delete("/",removeUser);
router.patch("/deactivate",deactivateUser);
router.patch("/reactivate",reactivateUser);

module.exports=router

