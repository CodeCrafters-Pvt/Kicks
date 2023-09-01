const express = require('express');
const router=express.Router();
const { login,logout,requestResetPassword,resetPassword } = require('../controllers/authController');

router.post("/login",login);
router.post("/logout",logout);
router.post("/request-reset-password",requestResetPassword);
router.post("/reset-password",resetPassword);


module.exports = router; 