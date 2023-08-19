const express = require('express');
const router=express.Router();
const { login,requestResetPassword,resetPassword } = require('../controllers/authController');

router.post("/login",login);
router.post("/request-reset-password",requestResetPassword);
router.post("/reset-password",resetPassword);


module.exports = router; 