const express = require('express');
const requireAuth=require('../middlewears/requireAuth')
const { createUser,getAllUsers,getUser,deactivateUser,reactivateUser,removeUser,sendOtp } = require('../controllers/userController');

const router=express.Router();


router.post("/signup/verify",sendOtp);
router.post("/signup",createUser);
router.get("/allUsers",requireAuth,getAllUsers);
router.get("/getUser/:email",requireAuth,getUser);
router.delete("/",requireAuth,removeUser);
router.patch("/deactivate",requireAuth,deactivateUser);
router.patch("/reactivate",requireAuth,reactivateUser);

module.exports=router

