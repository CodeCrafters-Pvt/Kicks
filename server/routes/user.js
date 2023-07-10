const express = require('express');
const router=express.Router();
const { createUser,getAllUsers,removeUser } = require('../controllers/userController');


router.get("/",getAllUsers);
router.post("/",createUser);
router.delete("/",removeUser);

module.exports=router