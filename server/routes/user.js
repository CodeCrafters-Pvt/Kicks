const express = require('express');
const router=express.Router();
const { createUser,getAllUsers,deactivateUser,reactivateUser,removeUser,sendOtp } = require('../controllers/userController');


router.get("/",getAllUsers);
router.post("/signup/verify",sendOtp);
router.post("/signup",createUser);
router.delete("/",removeUser);
router.patch("/deactivate",deactivateUser);
router.patch("/reactivate",reactivateUser);

module.exports=router

